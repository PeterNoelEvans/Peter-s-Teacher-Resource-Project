import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

interface LoginResponse {
  token: string;
  error?: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    class?: string;
    yearLevel?: number;
  };
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setUserType] = useState(localStorage.getItem('userType') || 'student');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (token && role) {
      const upperRole = role.toUpperCase();
      switch (upperRole) {
        case 'TEACHER':
          navigate('/teacher/dashboard');
          break;
        case 'STUDENT':
          navigate('/student/dashboard');
          break;
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        default:
          localStorage.clear();
          navigate('/login');
      }
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed. Please check your credentials.');
        return;
      }

      // Store user info in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userRole', data.user.role.toUpperCase());

      // Redirect based on role
      const role = data.user.role.toUpperCase();
      if (role === 'STUDENT') {
        if (data.user.class) {
          localStorage.setItem('userClass', data.user.class);
          localStorage.setItem('yearLevel', String(data.user.yearLevel));
          navigate('/student/dashboard');
        } else {
          setError('Student account is missing class information. Please contact support.');
        }
      } else if (role === 'TEACHER') {
        navigate('/teacher/dashboard');
      } else if (role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid user role.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1 id="loginTitle">
          {userType === 'teacher' ? 'Teacher Resource Platform' : 'Student Learning Platform'}
        </h1>
        <p id="loginSubtitle">
          {userType === 'teacher'
            ? 'Please login to access your teacher dashboard'
            : 'Please login to access your learning materials'}
        </p>
      </div>
      <form onSubmit={handleLogin}>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <button
          type="submit"
          className={`btn btn-login ${userType}`}
          id="loginButton"
        >
          Login
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <div className="text-center mt-3">
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
        <div className="mt-2">
          <a href="/forgot-password">Forgot Password?</a> |{' '}
          <a href="/forgot-email">Forgot Email?</a>
        </div>
      </div>
      <a href="/" className="back-link">
        ← Back to Home
      </a>
    </div>
  );
};

export default Login; 