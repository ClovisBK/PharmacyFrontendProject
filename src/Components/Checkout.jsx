// src/components/Checkout.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Components/CartContext'
import api from '../api'
import './Styles/checkout.css'

const Checkout = () => {
    const { cart, prepareOrderData, clearCart, getTotal } = useCart()
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        address: '',
        city: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // 1. Prepare order data
            const orderData = prepareOrderData(formData.address, formData.city)
            
            // 2. Call your API
            const response = await api.post('/orders', orderData)
            
            // 3. Success
            setSuccess(true)
            clearCart()
            
            // 4. Redirect after 3 seconds
            setTimeout(() => {
                navigate('/shops')
            }, 3000)
            
        } catch (err) {
            // 5. Handle error
            const errorMessage = err.response?.data?.message || err.response?.data || 'Failed to place order'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    // If cart is empty
    if (!cart.pharmacyId || cart.items.length === 0) {
        return (
            <div className="empty-checkout">
                <h2>Your cart is empty</h2>
                <button 
                    className="back-to-shops-btn"
                    onClick={() => navigate('/shops')}
                >
                    Browse Pharmacies
                </button>
            </div>
        )
    }

    if (success) {
        return (
            <div className="success-message">
                <h2>🎉 Order Placed Successfully!</h2>
                <p>Your order has been confirmed and is being processed.</p>
                <p>You will be redirected to the pharmacies page shortly.</p>
            </div>
        )
    }

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Checkout</h1>
            
            <div className="checkout-content">
                {/* Order Summary */}
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className="pharmacy-info">
                        <strong>Pharmacy:</strong> {cart.pharmacyName}
                    </div>
                    
                    <div className="items-list">
                        {cart.items.map(item => (
                            <div key={item.drugId} className="order-item">
                                <div className="item-name">{item.drugName}</div>
                                <div className="item-details">
                                    <span>Qty: {item.quantity}</span>
                                    <span>{item.price * item.quantity} FCFA</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="order-total">
                        <strong>Total: {getTotal()} FCFA</strong>
                    </div>
                </div>

                {/* Delivery Form */}
                <div className="delivery-form">
                    <h2>Delivery Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="address">Delivery Address *</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                placeholder="Street, building, apartment"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">City *</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                placeholder="Your city"
                            />
                        </div>

                        {error && (
                            <div className="error-message">
                                <i className="fa fa-exclamation-circle"></i> {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="place-order-btn"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <i className="fa fa-spinner fa-spin"></i> Processing...
                                </>
                            ) : (
                                'Place Order'
                            )}
                        </button>

                        <button 
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate('/shops')}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Checkout