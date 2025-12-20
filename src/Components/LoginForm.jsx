import React, { useState } from 'react';
import api from '../api';
import './Styles/loan.css';
import './Styles/forms.css';
import {Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

     const navigate = useNavigate();

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try{
            const response = await api.post('/Auth/login', formData);
            console.log("Full reponse:", response);
            const token = response.data.accessToken;

            console.log('token generated', token);
            if(token){
                localStorage.setItem('authToken', token);
                setMessage('Login successful!');
               
                navigate('/books');
            }else{
                setError("Login Succeeded but no token was returned.");
            }

        }catch(err){
            if(err.response?.data?.errors){
                const messages = Object.values(err.response.data.errors).flat().join(' ');
                setError(`${messages}`);
            }else if(err.response?.data?.message)
                setError(`${err.response.data.message}`);
            else
                setError('Login failed. Please check your credentials');
            console.error(err);
        }finally{
            setLoading(false);
        }
    }
  return (
      <div className='form-container'>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder='Email' onChange={handleChange} />
            <input type="password" name="password" placeholder='Password' onChange={handleChange} />
            <button type='submit'>Login</button>
        </form>
        <div style={{color: "blue"}} className='login-links'>

         <Link to="/forgot-password" style={{
            marginLeft: "10px", 
            color: "blue", 
            marginTop: "-10px",
            textDecoration: "none",
            fontSize: "15px"
            }}>Forgot Password?</Link>
         <Link to="/register" className='sign-up-link' style={{
            
             color: "blue",
             fontSize: "15px",
             textDecoration: "none"
             }}>Sign Up</Link>
        </div>
        
        {message && <p style={{color: "blue"}}>{message}</p>}
        {error && <p style={{color: "red"}}>{error}</p>}
        
    </div>
  )
}

export default LoginForm
