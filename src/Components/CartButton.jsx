// src/components/CartButton.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Components/CartContext'
import './Styles/cartButton.css'

const CartButton = () => {
    const { cart, removeFromCart, getTotal, getItemCount, clearCart } = useCart()
    const [showCart, setShowCart] = useState(false)
    const navigate = useNavigate()

    const handleCheckout = () => {
        setShowCart(false)
        navigate('/checkout')
    }

    const handleClearCart = () => {
        if(window.confirm('Clear all items from cart?')){
            clearCart();
        }
    }

    return (
        <div className="cart-button-container">
            <button 
                className="cart-button"
                onClick={() => setShowCart(!showCart)}
            >
                <i className="fa fa-shopping-cart"></i>
                {getItemCount() > 0 && (
                    <span className="cart-count">{getItemCount()}</span>
                )}
            </button>

            {showCart && (
                <div className="cart-dropdown">
                    <div className="cart-header">
                        <h4>Your Cart</h4>
                        <button 
                            className="close-cart"
                            onClick={() => setShowCart(false)}
                        >
                            ×
                        </button>
                    </div>

                    {cart.pharmacyId ? (
                        <>
                            <div className="cart-pharmacy">
                                Ordering from: <strong>{cart.pharmacyName}</strong>
                                <button
                                className='clear-cart-btn-small'
                                onClick={handleClearCart}
                                title='clear cart'

                                >
                                    <i className='fa fa-trash'></i> 
                                    Clear Cart
                                </button>
                            </div>
                            
                            <div className="cart-items">
                                {cart.items.map(item => (
                                    <div key={item.drugId} className="cart-item">
                                        <div className="item-info">
                                            <div className="item-name">{item.drugName}</div>
                                            <div className="item-brand">{item.brandName}</div>
                                        </div>
                                        <div className="item-details">
                                            <div className="item-quantity">Qty: {item.quantity}</div>
                                            <div className="item-price">{item.price * item.quantity} FCFA</div>
                                            <button 
                                                className="remove-item"
                                                onClick={() => removeFromCart(item.drugId)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-total">
                                <strong>Total: {getTotal()} FCFA</strong>
                            </div>

                            <button 
                                className="checkout-btn"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </button>
                        </>
                    ) : (
                        <div className="empty-cart">
                            <p>Your cart is empty</p>
                            <button 
                                className="browse-btn"
                                onClick={() => {
                                    setShowCart(false)
                                    navigate('/shops')
                                }}
                            >
                                Browse Pharmacies
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CartButton