import api from '../api'
import React, { useState } from 'react'

const ForgotPassword = () => {
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);


    try{

        await api.post("/Auth/forgot-password", {email});
        setMessage("A reset email has been sent to you");
        setEmail("");
    }catch(err){
        console.error(err);
        setError("Failed to send a reset email");
    }finally{
        setLoading(false);
    }
}
  return (
    <div className='form-container'>
    <h2>Forgot Password</h2>
    <p>Enter your email below and we'll send you a link to reset your password</p>
        <form onSubmit={handleSubmit}>
            <input 
                type='email'
                placeholder='Enter your account email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type='submit'>
                {loading ? "Sending...." : "Send Reset Link"}
            </button>

        </form>
        {message && <p style={{color: "green"}}>{message}</p>}
        {error && <p style={{color: "red"}}>{error}</p>}
    </div>
  )
}

export default ForgotPassword
