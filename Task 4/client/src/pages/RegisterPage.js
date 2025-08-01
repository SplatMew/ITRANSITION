import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:4000/api/register',
        { name, email, password }
      );
      setStatus('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: 360 }}>
        <h2 className="mb-4 text-center">Register</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {status && <div className="alert alert-success">{status}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text" className="form-control"
              value={name} onChange={e => setName(e.target.value)}
              required autoFocus
              placeholder="Your Name"
              autoComplete="name"
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email" className="form-control"
              value={email} onChange={e => setEmail(e.target.value)}
              required
              placeholder="address@example.com"
              autoComplete="username"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password" className="form-control"
              value={password} onChange={e => setPassword(e.target.value)}
              required
              placeholder="Password"
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;