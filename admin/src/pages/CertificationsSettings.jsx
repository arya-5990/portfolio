import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const CertificationsSettings = () => {
  const [certifications, setCertifications] = useState([]);
  const [newCert, setNewCert] = useState({ title: '', issuer: '', logo: '', file: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'portfolio', 'certifications'));
        if (docSnap.exists()) {
          setCertifications(docSnap.data().data || []);
        }
      } catch (error) {
        console.error("Error fetching certifications: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdd = () => {
    if(!newCert.title) return;
    setCertifications([...certifications, { ...newCert, id: Date.now() }]);
    setNewCert({ title: '', issuer: '', logo: '', file: '' });
  };

  const handleRemove = (id) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'portfolio', 'certifications'), { data: certifications });
      alert('Certifications saved to database successfully!');
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
          <h1>Certifications</h1>
          <p>Add, remove or modify your certifications.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="card">
        <h3>Add New Certification</h3>
        <br />
        <div className="form-row">
          <div className="form-group">
            <label>Certificate Name</label>
            <input type="text" value={newCert.title} onChange={(e) => setNewCert({...newCert, title: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Issuing Organisation</label>
            <input type="text" value={newCert.issuer} onChange={(e) => setNewCert({...newCert, issuer: e.target.value})} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Logo of Organisation (URL)</label>
            <input type="text" value={newCert.logo} onChange={(e) => setNewCert({...newCert, logo: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Certificate PDF/IMG Link</label>
            <input type="text" value={newCert.file} onChange={(e) => setNewCert({...newCert, file: e.target.value})} />
          </div>
        </div>
        <button className="btn btn-outline" onClick={handleAdd}>
          <Plus size={18} /> Add Certification
        </button>
      </div>

      <div className="card">
        <h3>Current Certifications</h3>
        <br />
        <div className="cert-list">
          {certifications.map(cert => (
            <div key={cert.id} className="list-item">
              <div className="item-info">
                <h4>{cert.title}</h4>
                <p>{cert.issuer}</p>
              </div>
              <button className="btn btn-danger" onClick={() => handleRemove(cert.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {certifications.length === 0 && <p style={{color: '#94a3b8'}}>No certifications added yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default CertificationsSettings;
