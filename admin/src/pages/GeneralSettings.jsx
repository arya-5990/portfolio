import React, { useState, useEffect, useRef } from 'react';
import { Save, UploadCloud } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../utils/cloudinary';

const GeneralSettings = () => {
  const [formData, setFormData] = useState({
    heroImage: '/images/home.png',
    name: 'Arya Sharma',
    tagline: 'MTech (IT) Student | Backend Developer | MERN Stack Intern',
    tag1: 'Software Developer',
    tag2: 'Web Developer',
    tag3: 'Project Manager',
    tag4: 'Database Engineer',
    socialLinks: []
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [newSocial, setNewSocial] = useState({ platform: '', icon: '', url: '' });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'portfolio', 'general'));
        if (docSnap.exists()) {
          setFormData(docSnap.data().data || docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching general data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Save file for uploading during handleSave
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, heroImage: imageUrl }); // Show local preview
    }
  };

  const handleAddSocial = () => {
    if (!newSocial.url) return;
    setFormData({
      ...formData,
      socialLinks: [...(formData.socialLinks || []), { ...newSocial, id: Date.now() }]
    });
    setNewSocial({ platform: '', icon: '', url: '' });
  };

  const handleRemoveSocial = (id) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.filter(social => social.id !== id)
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let finalData = { ...formData };
      if (imageFile) {
        const uploadedUrl = await uploadToCloudinary(imageFile);
        finalData.heroImage = uploadedUrl;
      }
      await setDoc(doc(db, 'portfolio', 'general'), finalData);
      setFormData(finalData); // update in case image URL changed
      setImageFile(null);
      alert('General settings saved to database successfully!');
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
        <h1>General Settings</h1>
        <p>Manage your hero image, base info, and main taglines.</p>
      </div>

      <div className="card">
        <h3>Hero Profile</h3>
        <br />
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label>Hero Tagline</label>
          <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label>Hero Image Path / URL</label>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginTop: '0.5rem' }}>
            {formData.heroImage ? (
              <img 
                src={formData.heroImage} 
                alt="Preview" 
                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
              />
            ) : (
              <div style={{ width: '120px', height: '120px', backgroundColor: 'var(--bg-dark)', borderRadius: '0.5rem', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>No Image</div>
            )}
            <div style={{ flex: 1 }}>
              <input type="text" name="heroImage" value={formData.heroImage} onChange={handleChange} style={{ marginBottom: '1rem' }} placeholder="Enter image URL or upload file" />
              
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
              />
              <button className="btn btn-outline" onClick={() => fileInputRef.current.click()} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <UploadCloud size={18} /> Upload Image File
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Profession Tags (Rotating Circle)</h3>
        <br />
        <div className="form-row">
          <div className="form-group">
            <label>Tag 1</label>
            <input type="text" name="tag1" value={formData.tag1} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Tag 2</label>
            <input type="text" name="tag2" value={formData.tag2} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Tag 3</label>
            <input type="text" name="tag3" value={formData.tag3} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Tag 4</label>
            <input type="text" name="tag4" value={formData.tag4} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Primary Social Media (Hero Section)</h3>
        <br />
        <div className="form-row">
          <div className="form-group">
            <label>Platform Name</label>
            <input type="text" placeholder="e.g. Twitter" value={newSocial.platform} onChange={(e) => setNewSocial({...newSocial, platform: e.target.value})} />
          </div>
          <div className="form-group">
            <label>BoxIcon Class</label>
            <input type="text" placeholder="e.g. bx bxl-twitter" value={newSocial.icon} onChange={(e) => setNewSocial({...newSocial, icon: e.target.value})} />
          </div>
        </div>
        <div className="form-group">
          <label>URL</label>
          <input type="text" placeholder="https://..." value={newSocial.url} onChange={(e) => setNewSocial({...newSocial, url: e.target.value})} />
        </div>
        <button className="btn btn-outline" onClick={handleAddSocial} style={{ marginBottom: '2rem' }}>
          <UploadCloud size={18} style={{ display: 'none' }} /> Add Social Link
        </button>

        <div className="social-list">
          {formData.socialLinks.map(social => (
            <div key={social.id} className="list-item">
              <div className="item-info row" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <i className={`${social.icon}`} style={{ fontSize: '24px', color: '#6366f1' }}></i>
                <div>
                  <h4>{social.platform}</h4>
                  <p style={{ wordBreak: 'break-all' }}>{social.url}</p>
                </div>
              </div>
              <button className="btn btn-danger" onClick={() => handleRemoveSocial(social.id)}>
                <Save size={16} style={{ display: 'none' }} /> Remove
              </button>
            </div>
          ))}
          {formData.socialLinks.length === 0 && <p style={{color: '#94a3b8'}}>No social links added yet.</p>}
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
        <Save size={18} />
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default GeneralSettings;
