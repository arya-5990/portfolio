import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ExperienceSettings = () => {
  const [experiences, setExperiences] = useState([]);
  const [newExp, setNewExp] = useState({ name: '', logo: '', position: '', dates: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'portfolio', 'experiences'));
        if (docSnap.exists()) {
          setExperiences(docSnap.data().data || []);
        }
      } catch (error) {
        console.error("Error fetching experiences: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdd = () => {
    if(!newExp.name) return;
    setExperiences([...experiences, { ...newExp, id: Date.now() }]);
    setNewExp({ name: '', logo: '', position: '', dates: '', description: '' });
  };

  const handleRemove = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'portfolio', 'experiences'), { data: experiences });
      alert('Experiences saved to database successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading Settings...</div>;

  return (
    <div className="page-wrapper">
      <div className="page-header flex-between">
        <div>
          <h1>Experience</h1>
          <p>Add, remove or modify your work history.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="card">
        <h3>Add New Experience</h3>
        <br />
        <div className="form-row">
          <div className="form-group">
            <label>Company/Organization Name</label>
            <input type="text" value={newExp.name} onChange={(e) => setNewExp({...newExp, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Company Logo URL</label>
            <input type="text" value={newExp.logo} onChange={(e) => setNewExp({...newExp, logo: e.target.value})} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Position Worked In</label>
            <input type="text" value={newExp.position} onChange={(e) => setNewExp({...newExp, position: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Start and End Date (e.g. Apr 2025 - Jul 2025)</label>
            <input type="text" value={newExp.dates} onChange={(e) => setNewExp({...newExp, dates: e.target.value})} />
          </div>
        </div>
        <div className="form-group">
          <label>Description of Work</label>
          <textarea value={newExp.description} onChange={(e) => setNewExp({...newExp, description: e.target.value})} placeholder="Describe your duties..." />
        </div>
        <button className="btn btn-outline" onClick={handleAdd}>
          <Plus size={18} /> Add Experience
        </button>
      </div>

      <div className="card">
        <h3>Current Experience Entries</h3>
        <br />
        <div className="exp-list">
          {experiences.map(exp => (
            <div key={exp.id} className="list-item">
              <div className="item-info">
                <h4>{exp.name} - {exp.position}</h4>
                <p style={{ color: '#6366f1', marginBottom: '8px' }}>{exp.dates}</p>
                <p>{exp.description.substring(0, 100)}...</p>
              </div>
              <button className="btn btn-danger" onClick={() => handleRemove(exp.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {experiences.length === 0 && <p style={{color: '#94a3b8'}}>No experience added yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSettings;
