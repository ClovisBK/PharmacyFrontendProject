import React, {useState} from 'react'
import api from '../api';
import {Link, useNavigate } from 'react-router-dom';

import './Styles/forms.css'


const RegisterMember = () => {
const [formData, setFormData] = useState({

    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
});
const [message, setMessage] = useState('');
const [error, setError] = useState('');
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

    if(formData.password !== formData.confirmPassword){
        setError("Passwords don't match.");
        return;
    }

    const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        password: formData.password
    };
    try{
        const response = await api.post('/Auth/register', payload);
        // setMessage('Registration successful! You can now log in.');

       const token = response.data.token;
       if(token){
           console.log(token);
           localStorage.setItem('authToken', token);
       }else{
        console.log("There was no token generated");
       }
       
        setFormData({
            fullName: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        navigate('/books');
    }catch(err){
        if(err.response?.data?.errors){
                const messages = Object.values(err.response.data.errors).flat().join(' ');
                setError(`${messages}`);
            }else if(err.response?.data?.message)
                setError(`${err.response.data.message}`);
            else
                setError('Login failed. Please check your credentials');
        
        console.error(error);
    }finally{
        setLoading(false);
    }
};

  return (
   <div className='form-container'>
      <h2>Registration page</h2>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name='fullName' 
            placeholder='Full Name' 
            value={formData.fullName} 
            onChange={handleChange} />
            {error.fullName &&  <span id='nameError'>{error.fullName}</span>}

            <input 
            type="email"
             name='email' 
             placeholder='Email' 
             value={formData.email} 
             onChange={handleChange} />
            {error.email &&  <span id='emailError'>{error.email}</span>}

            <input 
             type="password" 
             name='password' 
             placeholder='Password' 
             value={formData.password} 
             onChange={handleChange} />
            {error.password &&  <span id='passwordError'>{errors.password}</span>}

            <input 
             type="password" 
             name='confirmPassword' 
             placeholder='Confirm Password' 
             value={formData.confirmPassword} 
             onChange={handleChange} />
            {error.confirmPassword &&  <span id='confirmPasswordError'>{error.confirmPassword}</span>}

            <input 
            type="tel" 
            name='phone' 
            placeholder='Phone Number' 
            value={formData.phone} onChange={handleChange} />
            {error.phone &&  <span id='phoneError'>{error.phone}</span>}

            <button type='submit'>{loading ? <i className='fa fa-spinner fa-spin'></i> : 'Register'}</button>
        </form>
        <div>Already have an account? <Link to="/login">Log in</Link></div>
        {message && <p style={{color: "green"}}>{message}</p>}
    
    </div>
  );
};

export default RegisterMember
