import React, { useEffect, useState } from 'react'
import './Styles/dashboard.css'
import { format } from 'date-fns'
import api from '../api'
import { style } from 'framer-motion/client'
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
    //creating the colors for the status
    const getStatusColor = (status) => {
      const statusMap = {
        pending: {
          bg: 'rgba(182, 119, 3, 0.14)',
          text: '#f39c12'
        },
     
        delivered: {
          bg: 'rgba(14, 90, 4, 0.14)',
          text: '#27ae60'

        },
        cancelled: {
          bg: 'rgba(245, 5, 5, 0.14)',
          text: '#e74c3c'
          
        }
      };
      const normalizedStatus = status?.toLowerCase();
      return statusMap[normalizedStatus] || {bg: 'rgba(149,165,166,0.14)', text: 'green'}
    }
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
       <h1 className='order-section'>Order History</h1>
       <div className="order-history">
        {orders.map(order => {
          const styles = getStatusColor(order.status);
          return (
          <div key={order.id} className='order-card'>
            <div className='right'>
              <div className='order-text'>{order.pharmacyName}</div>
              <div className="date-status">
                  <div className='date'>{format(new Date(order.orderDate), "MMM, dd yyyy")}</div>
                  <div className='status'
                    style={{
                      backgroundColor: styles.bg,
                      color: styles.text
                    }}
                  >{order.status}</div>
              </div>
            </div>
            <div className='total-price'>{order.totalPrice} FCFA</div>
          </div>
        );
          })}
       </div>
    </div>
  )
}

export default Dashboard
