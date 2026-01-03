import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../api'


const ResetPassword = () => {
const location = useLocation();
const navigate = useNavigate();

const searchParams = new URLSearchParams(location.search);
const email = searchParams.get('email');
const token = searchParams.get('token');

const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [message, setMessage] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();

        if(newPassword !== confirmPassword){
            setMessage("Passwords don't match");
            return;
        }
        if(newPassword.length < 6){
            setMessage("Password must be at least 6 characters");
            return;
        }
        setLoading(true);
        setMessage('');
        
        try{
            await api.post('/Auth/reset-password', {
                email,
                token,
                newPassword,
                confirmPassword
            });
            setMessage("Successul password reset! redirecting to login...");
            setNewPassword('');
            setConfirmPassword('');
        
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }catch(error){
            setError("Failed to sent reset link")
        }finally{
            setLoading(false);
        }
};
    if (!email || !token) {
    return (
      <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <h2>Invalid Reset Link</h2>
        <p>This password reset link is invalid or has expired.</p>
        <button onClick={() => navigate('/forgot-password')}>
          Get New Reset Link
        </button>
      </div>
    );
  }
  return (
    <div className='form-container'>
    <h2>Reset Password</h2>
    <p>Enter a strong password you can remember.</p>
        <form onSubmit={handleSubmit}>
            <input 
                type='password'
                placeholder='New password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <input 
                type='password'
                placeholder='Confirm New Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            <button type='submit'>
                {loading ? "Sending...." : "Reset password"}
            </button>

        </form>
        {message && <p style={{color: "green"}}>{message}</p>}
        {error && <p style={{color: "red"}}>{error}</p>}
    </div>
  )
}

export default ResetPassword
