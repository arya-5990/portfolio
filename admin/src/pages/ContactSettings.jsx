import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ContactSettings = () => {
  const [formData, setFormData] = useState({
    email: 'aryasha4906c@gmail.com',
    phone: '+91 7049780160',
    linkedin: 'Arya Sharma',
    linkedinLink: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'portfolio', 'contact'));
        if (docSnap.exists()) {
          setFormData(docSnap.data().data || docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching contact data: ", error);
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
      await setDoc(doc(db, 'portfolio', 'contact'), formData);
      alert('Contact settings saved to database successfully!');
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
        <h1>Contact Information</h1>
        <p>Manage your contact details displayed at the bottom of the portfolio.</p>
      </div>

      <div className="card">
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>LinkedIn Display Name</label>
            <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>LinkedIn Full URL</label>
            <input type="text" name="linkedinLink" value={formData.linkedinLink} onChange={handleChange} />
          </div>
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
        <Save size={18} />
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default ContactSettings;
