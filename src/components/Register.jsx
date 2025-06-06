import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Initialize navigate

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/register', {
        user_name: userName,
        password,
      });
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login'); // Redirect to the login page
      }, 1000); // Redirect after 1 second
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error registering. Please try again.');
      }
    }
  };

  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    textAlign: 'center',
    margin: 0,
    padding: 0,
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '300px',
  };

  const inputStyle = {
    padding: '15px',
    fontSize: '18px',
    border: '1px solid #444',
    borderRadius: '5px',
    textAlign: 'center',
    outline: 'none',
  };



  return (
    <div style={style}>
      <h2 style={{ fontSize: '32px' }}>Register</h2>
      <form onSubmit={handleRegister} style={formStyle}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={inputStyle}
          required
        />
       <button style={{ margin: '10px', padding: '10px 20px' }}>
         Register
       </button>
      </form>
      {message && <p style={{ fontSize: '18px', marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default Register;
