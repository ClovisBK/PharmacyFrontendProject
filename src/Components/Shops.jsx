import React, { useEffect, useState } from 'react'
import './Styles/shops.css'
import api from '../api'
import { useNavigate } from 'react-router-dom';

const Shops = () => {
    const [pharmacies, setPharmacies] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadPharmacies(){
            try{
                const response = await api.get('/pharmacies/get-pharmacies');
                setPharmacies(response.data);
            }catch(error){
                console.error('Error loading pharmacies', error);
                setError("Failed to load pharmacies");
            }finally{
                setLoading(false);
            }
        }
        loadPharmacies();
    }, [])

    const handleShopping = (pharmacyId) => {
        navigate(`/pharmacy/${pharmacyId}/drugs`);
    }
  return (
    <div className='shops-container'>
        <div className='heading'><h1>Choose a pharmacy you want to shop in at your convenience</h1></div>
        {error && <p className='ta-center text-red-700'>{error}</p>}
        {loading ?
         (
            <div>Loading pharmacies...</div>
         ): (

            <div className="shop-container">
                {pharmacies.map(pharmacy => (
                    <div className="shop-card-container" key={pharmacy.id}>
                        <div className="upper-part">
                            <div className='pharmacy-name'><i className='fas fa-home'></i>{pharmacy.name} <span className='text-orange-300'><i className='fa fa-star ml-4'></i>4.5</span></div>
                            <div className="location"><i className='fa-solid fa-location-dot'></i>2.4km {pharmacy.addressStreet}</div>
                        </div>
                        <div className="middle-part">
                            <div className="operation">
                            <i className='fa fa-clock'></i>Open 24/7
                            </div>
                            <div className="delivery"><i className='fa fa-truck-medical'></i>Delivery: 30min . 3000 FCFA</div>
                            <div className="contact"><i className='fa fa-user'></i>{pharmacy.phoneNumber}</div>
                        </div>
                        <div className="lower-part">
                            <div>
                                <button 
                                className='shop-btn'
                                onClick={() => handleShopping(pharmacy.id)}
                                ><i className='fa fa-store'></i>Shop Here</button>
                                <button className='call-btn'>Call Now</button>
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
        )}
    </div>
  )
}

export default Shops
