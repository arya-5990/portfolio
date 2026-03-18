import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Lock } from 'lucide-react';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const docSnap = await getDoc(doc(db, 'portfolio', 'admin'));
      
      if (docSnap.exists()) {
        const credentials = docSnap.data();
        if (credentials.username === username && credentials.password === password) {
          sessionStorage.setItem('isAdminAuth', 'true');
          onLoginSuccess();
        } else {
          setError('Invalid username or password.');
        }
      } else {
        setError('Admin credentials not found in database.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during login. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'var(--bg-dark)'
    }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '3rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            color: 'var(--primary-color)',
            marginBottom: '1rem'
          }}>
            <Lock size={30} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Admin Login</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Enter your secure credentials</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Enter username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p style={{ color: 'var(--danger-color)', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</p>}

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
