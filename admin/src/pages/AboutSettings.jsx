import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AboutSettings = () => {
  const [formData, setFormData] = useState({
    heading: 'About Me',
    subheading: 'MTech (Information Technology) Student | Backend & Full-Stack Developer',
    description1: 'I am an MTech (Information Technology) student at IIPS, DAVV, Indore, with hands-on experience in backend and full-stack web development...',
    description2: 'My experience spans MERN and MEAN stacks, where I collaborated closely with frontend teams...',
    description3: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'portfolio', 'about'));
        if (docSnap.exists()) {
          setFormData(docSnap.data().data || docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching about data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'portfolio', 'about'), formData);
      alert('About section saved to database successfully!');
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
      <div className="page-header">
        <h1>About Me Section</h1>
        <p>Modify the heading and descriptions of the About section.</p>
      </div>

      <div className="card">
        <div className="form-group">
          <label>Main Heading</label>
          <input type="text" name="heading" value={formData.heading} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Sub Heading / Title</label>
          <input type="text" name="subheading" value={formData.subheading} onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label>Description Paragraph 1</label>
          <textarea name="description1" value={formData.description1} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Description Paragraph 2</label>
          <textarea name="description2" value={formData.description2} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Description Paragraph 3</label>
          <textarea name="description3" value={formData.description3} onChange={handleChange}></textarea>
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
        <Save size={18} />
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default AboutSettings;
