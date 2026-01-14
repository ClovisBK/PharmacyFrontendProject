import React, { useEffect, useState } from 'react'
import './Styles/dashboard.css'
import api from '../api'
const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(()  => {
    async function LoadUserOrders(){
      try{
        const response = await api.get('/orders/user-orders');
        setOrders(response.data);
      }catch{
        setError("Error loading orders")
      }
      
    }
    LoadUserOrders();
  }, [])
    
  return (
    <div className='dashboard-container'>
       <div className="dashboard-heading">
        <h1>Welcome Back, Clovis!</h1>
        <p>Your pharmacy orders and health information in one place</p>
       </div>
       <div className="informatics">
        <div><span>8</span> <br /> Total Orders</div>
        <div><span>5</span> <br /> Active Orders</div>
        <div><span>34</span> <br /> Pharmacies Used</div>
        <div><span>98%</span> <br /> Success Rate</div>
       </div>
       <div className="order-history">
        {orders.map(order => (
          <div key={order.id} className='order-card'>
            <div className='right'>
              <div className='order-text'>{order.deliveryAddress}</div>
              <div>{order.orderDate}</div>
            </div>
            <div className='total-price'>{order.totalPrice} FCFA</div>
          </div>
        ))}
       </div>
    </div>
  )
}

export default Dashboard
