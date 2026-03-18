import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ProjectsSettings = () => {
  const [projects, setProjects] = useState([]);
  const [newProj, setNewProj] = useState({ title: '', image: '', description: '', link: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'portfolio', 'projects'));
        if (docSnap.exists()) {
          setProjects(docSnap.data().data || []);
        }
      } catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdd = () => {
    if(!newProj.title) return;
    setProjects([...projects, { ...newProj, id: Date.now() }]);
    setNewProj({ title: '', image: '', description: '', link: '' });
  };

  const handleRemove = (id) => {
    setProjects(projects.filter(proj => proj.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'portfolio', 'projects'), { data: projects });
      alert('Projects saved to database successfully!');
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
          <h1>Projects</h1>
          <p>Add, remove or modify portfolio projects.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="card">
        <h3>Add New Project</h3>
        <br />
        <div className="form-row">
          <div className="form-group">
            <label>Project Name</label>
            <input type="text" value={newProj.title} onChange={(e) => setNewProj({...newProj, title: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Project Cover Image URL</label>
            <input type="text" value={newProj.image} onChange={(e) => setNewProj({...newProj, image: e.target.value})} />
          </div>
        </div>
        <div className="form-group">
          <label>Link (External URL / GitHub)</label>
          <input type="text" value={newProj.link} onChange={(e) => setNewProj({...newProj, link: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Small Description</label>
          <textarea value={newProj.description} onChange={(e) => setNewProj({...newProj, description: e.target.value})} />
        </div>
        <button className="btn btn-outline" onClick={handleAdd}>
          <Plus size={18} /> Add Project
        </button>
      </div>

      <div className="card">
        <h3>Current Projects</h3>
        <br />
        <div className="proj-list">
          {projects.map(proj => (
            <div key={proj.id} className="list-item">
              <div className="item-info">
                <h4>{proj.title} <a href={proj.link} target="_blank" style={{color: '#6366f1', fontSize: '12px'}}>[Link]</a></h4>
                <p>{proj.description.substring(0, 100)}...</p>
              </div>
              <button className="btn btn-danger" onClick={() => handleRemove(proj.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {projects.length === 0 && <p style={{color: '#94a3b8'}}>No projects added yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSettings;
