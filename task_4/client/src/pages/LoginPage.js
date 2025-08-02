import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

function LoginPage({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setError('');
    setStatus('');
    setLoading(true);

    try{
      const response = await axios.post(
        'http://localhost:4000/api/login',
        {email,password}
      );
      onLogin(response.data.token);
      setStatus('Login successful! Redirecting...');
      setTimeout(()=>navigate("/users"),800);
    }catch(err){
      setError(
        err.response?.data?.error || "Server error, please try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: 360 }}>
        <h2 className="mb-4 text-center">Sign In</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {status && <div className="alert alert-success">{status}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email" className="form-control"
              value={email} onChange={e => setEmail(e.target.value)}
              autoFocus required
              autoComplete="username"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password" className="form-control"
              value={password} onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="Your password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/register">Don't have an account? Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage