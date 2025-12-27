import React, { useEffect, useMemo, useState } from 'react'
import api from '../api'
import { useNavigate, useParams } from 'react-router-dom';
import './Styles/pharmacyDrugs.css'
import { button } from 'framer-motion/client';
const PharmacyDrugs = () => {
const [pharmacyDrugs, setPharmacyDrugs] = useState([]);
const [pharmacy, setPharmacy] = useState(null);
const [error, setError] = useState('');
const {pharmacyId} = useParams();
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState('');
const navigate = useNavigate();

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
            {(searchTerm ? filterDrugs : pharmacyDrugs).map(drugs => (
                <div className="drug-card-container" key={drugs.id}>
                    <div className="image-section">
                        <img src='\amoxicillin.jpg' alt="" />
                    </div>
                    <div className="description">
                        <div className="drug-name">{drugs.genericName} {drugs.dosageForm}</div>
                        <div className="strength"><span>{drugs.strength}</span></div>
                    </div>
                    <div className="generic-name">{drugs.brandName}</div>
                    <div className="price">{drugs.unitPrice} FCFA</div>
                    <div className="add-to-cart">
                        <button><i className='fa fa-cart'></i>Add to Cart</button>
                    </div>
                </div>
            ))}
            </div>
        )}


        
    </div>
  )
}

export default PharmacyDrugs
