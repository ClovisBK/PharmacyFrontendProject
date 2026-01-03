import React, { useEffect, useMemo, useState } from 'react'
import api from '../api'
import { useNavigate, useParams } from 'react-router-dom';
import './Styles/pharmacyDrugs.css'
import { useCart } from './CartContext';
const PharmacyDrugs = () => {
const [pharmacyDrugs, setPharmacyDrugs] = useState([]);
const [pharmacy, setPharmacy] = useState(null);
const [error, setError] = useState('');
const {pharmacyId} = useParams();
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState('');
const navigate = useNavigate();

const {cart, addToCart, getItemCount} = useCart();

    useEffect(() => {
        async function LoadPharmacyDrugs(){
            try{
                const pharmacyRes = await api.get(`/pharmacies/${pharmacyId}`);
                setPharmacy(pharmacyRes.data)

                const response = await api.get(`/drugs/${pharmacyId}/pharmacy-drugs`);
                setPharmacyDrugs(response.data);
            }catch(error){
                console.error("Error getting pharmacy drugs", error);
            }finally{
                setLoading(false);
            }
        }
        LoadPharmacyDrugs();
    }, [pharmacyId]);


    const filterDrugs = useMemo(() => {
        if(!searchTerm.trim()){
            return pharmacyDrugs
        }
        const term = searchTerm.toLowerCase();

        return pharmacyDrugs.filter(drug => {
            return(
                (drug.genericName && drug.genericName.toLowerCase().includes(term)) ||
                (drug.brandName && drug.brandName.toLowerCase().includes(term)) ||
                (drug.dosageForm && drug.dosageForm.toLowerCase().includes(term))
            )
        })
    }, [pharmacyDrugs, searchTerm]);

    const handlSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }
    const clearSearch = () => {
        setSearchTerm('');
    }
    
    const handleAddToCart = (drug) => {
        if(!pharmacy)
            return
        addToCart(drug, pharmacyId, pharmacy.name)
        console.log(`Added ${drug.genericName} to Cart`);
    }

    if(loading){
        return(
            <h1>Loading drugs....</h1>
        )
    }
    if(error){
        return(
            <did style={{padding: '20px'}}>
                <div style={{marginBottom: '20px'}}>
                    <button onClick={() => navigate('/shops')} style={{marginBottom: '10px', padding: '8px 16px'}}>
                        Back to Pharmacies
                    </button>
                </div>
            </did> 
        )
    }
  return (
    <div className=''>
        <div>
        <button
        onClick={() => navigate('/shops')}
        className='back-btn'
        >
            <i className='fa fa-arrow-left'></i>Shops
        </button>
        <div className='welcome'>Welcome to {pharmacy.name}</div>

        {cart.pharmacyId && cart.pharmacyId === pharmacyId && (
            <div className='cart-status'>
                <i className='fa fa-shopping-cart'></i>
                {getItemCount} items in cart
            </div>
        )}
        </div>
        <div className='search-field'>

            <input 
                type='text'
                placeholder='Search drugs...'
                onChange={handlSearchChange}
                value={searchTerm}
             />
             {searchTerm && (
                <button 
                className='clear-btn'
                onClick={clearSearch}
                >
                    Clear
                </button>
             )}
        </div>
        {searchTerm && filterDrugs.length === 0 ? (
            <div className='no-results'>
                <p>No drugs found for "{searchTerm}"</p>
                <button
                onClick={clearSearch}
                >
                    View all Drugs
                </button>
            </div>
        ): (

            <div className="drug-container">
            {(searchTerm ? filterDrugs : pharmacyDrugs).map(drug => (
                <div className="drug-card-container" key={drug.id}>
                    <div className="image-section">
                        <img src={`/${drug.imageUrl}`} alt={drug.genericName} />
                    </div>
                    <div className="description">
                        <div className="drug-name">{drug.genericName} {drug.dosageForm}</div>
                        <div className="strength"><span>{drug.strength}</span></div>
                    </div>
                    <div className="generic-name">{drug.brandName}</div>
                    <div className="price">{drug.unitPrice} FCFA</div>
                    <div className="add-to-cart">
                        <button
                        onClick={() => handleAddToCart(drug)}
                        ><i className='fa fa-cart'></i>Add to Cart</button>
                    </div>
                </div>
            ))}
            </div>
        )}


        
    </div>
  )
}

export default PharmacyDrugs
