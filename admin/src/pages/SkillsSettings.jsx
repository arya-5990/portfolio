import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const SkillsSettings = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', icon: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'portfolio', 'skills'));
        if (docSnap.exists()) {
          setSkills(docSnap.data().data || []);
        }
      } catch (error) {
        console.error("Error fetching skills: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdd = () => {
    if(!newSkill.name) return;
    setSkills([...skills, { ...newSkill, id: Date.now() }]);
    setNewSkill({ name: '', icon: '' });
  };

  const handleRemove = (id) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'portfolio', 'skills'), { data: skills });
      alert('Skills saved to database successfully!');
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
          <h1>Skills</h1>
          <p>Add, remove or modify technical skills.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="card">
        <h3>Add New Skill</h3>
        <br />
        <div className="form-row">
          <div className="form-group">
            <label>Skill Name</label>
            <input type="text" placeholder="e.g. React Native" value={newSkill.name} onChange={(e) => setNewSkill({...newSkill, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label>BoxIcon Class</label>
            <input type="text" placeholder="e.g. bx bxl-react" value={newSkill.icon} onChange={(e) => setNewSkill({...newSkill, icon: e.target.value})} />
          </div>
        </div>
        <button className="btn btn-outline" onClick={handleAdd}>
          <Plus size={18} /> Add Skill
        </button>
      </div>

      <div className="card">
        <h3>Current Skills</h3>
        <br />
        <div className="skills-list">
          {skills.map(skill => (
            <div key={skill.id} className="list-item">
              <div className="item-info row" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <i className={`${skill.icon}`} style={{ fontSize: '24px', color: '#6366f1' }}></i>
                <div>
                  <h4>{skill.name}</h4>
                  <p>{skill.icon}</p>
                </div>
              </div>
              <button className="btn btn-danger" onClick={() => handleRemove(skill.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {skills.length === 0 && <p style={{color: '#94a3b8'}}>No skills added yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default SkillsSettings;
