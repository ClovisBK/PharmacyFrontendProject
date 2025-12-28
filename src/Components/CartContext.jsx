import React, { createContext, useContext, useState } from "react";


const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState({
        pharmacyId: null,
        pharmacyName: '',
        items: []
    })

    const addToCart = (drug, pharmacyId, pharmacyName) => {
        setCart(prev => {
            if(!prev.pharmacyId){
                return{
                    pharmacyId,
                    pharmacyName,
                    items: [{
                        drugId: drug.id,
                        drugName: drug.genericName,
                        price: drug.unitPrice,
                        quantity: 1
                    }]
                }
            }
            if(prev.pharmacyId !== pharmacyId){
                alert(`You cart has items from ${prev.pharmacyName}. Please complete that order first.`)
                return prev;
            }

            const existingIndex = prev.items.findIndex(item => item.drugId == drug.id);
            if(existingIndex >= 0){
                const updatedItems = [...prev.items];
                updatedItems[existingIndex].quantity += 1
                return {...prev, items: updatedItems}
            }else{
                return {
                    ...prev,
                    items: [...prev.items, {
                        drugId: drug.id,
                        drugName: drug.genericName || drug.brandName,
                        price: drug.unitPrice,
                        quantity: 1
                    }]
                }
            }
        })
    }
    const removeFromCart = (drugId) => {
        setCart(prev => {
            const newItems = prev.items.filter(item => item.drugId !== drugId);
            if(newItems.length === 0){
                return {
                    pharmacyId: null, 
                    pharmacyName: '',
                    items: []
                }
            }
            return {...prev, items: newItems}
        })
    }

    const clearCart = () => {
        setCart({pharmacyId: null, pharmacyName: '', items: []})
    }

    const prepareOrderData = (deliveryAddress, deliveryCity) => {
        if(!cart.pharmacyId || cart.items.length === 0){
            throw new Error("Cart is empty")
        }

        return {
            PharmacyId: cart.pharmacyId,
            DeliveryAddress: deliveryAddress,
            DeliveryCity: deliveryCity,
            OrderItem: cart.items.map(item => ({
                DrugId: item.drugId,
                Quantity: item.quantity
            }))
        }
    }
    const getTotal = () => {
        return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }

    const getItemCount = () => {
        return cart.items.reduce((sum, item) => sum + item.quantity, 0)
    }
    return(
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            prepareOrderData,
            getTotal,
            getItemCount
        }}>
            {children}
        </CartContext.Provider>
    )
}