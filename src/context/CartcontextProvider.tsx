'use client'
import {  useToast } from "@/components/ui/use-toast";
import { Product, } from "@/types/Product";
import { CartItem, } from "@/types/cartItem";
import axios, { AxiosError } from "axios";
import {  createContext, useContext, useEffect, useState } from "react";

interface CartContextType{
    cart : CartItem[];
    addToCart : (product : Product,quantity : number) => Promise<void>;
    removeFromCart : (id : string) => Promise<void>;
    updateQuantity : (id : string, quantity : number) => Promise<void>;
    total : number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const  CartContextProvider = ({ children }: { children: React.ReactNode }) =>{
    const {toast} = useToast();
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(()=>{
        const fetchCartData = async () => await fetchCart();
        fetchCartData();
    },[]);

    const fetchCart = async ()=>{
        try{
            const response = await axios.get('/api/get-cart-item');
            const data = Array.isArray(response.data.data) ? response.data.data : [];
            setCart(data);
        }
        catch(error){
            console.log("An error occurred while fetching cart items");
            const axiosError = error as AxiosError;
            console.log(axiosError.response?.data);
        }
    }

    const addToCart = async (product : Product, quantity : number)=>{
        try{
            const resp = await axios.post('/api/add-cart-item', {product,quantity});
            setCart(prevCart => [...prevCart, resp.data.data]);

            await fetchCart();
            toast({
                title : "Item added to cart",
                description : `${product.name} was added to the cart`,
                variant : "default",
            })
            
        }
        catch(error){
            console.log("An error occurred while adding the item to the cart");
            const axiosError = error as AxiosError;
            console.log(axiosError.response?.data);
        }
    }

    const removeFromCart = async (id: string)=>{
        try{
            const resp = await axios.delete(`/api/delete-cart-item/${id}`);
            await fetchCart();
            toast({
                title : "Item removed from cart",
                description : `Item was removed from the cart`,
                variant : "default",
            })
        }
        catch(error){
            console.log("An error occurred while removing the item from the cart");
            const axiosError = error as AxiosError;
            console.log(axiosError.response?.data);
        }
    }

    const updateQuantity = async (id: string, quantity: number)=>{
        try{
            console.log("id is "  , id,quantity);
            const resp = await axios.patch('/api/update-cart-item', { id, quantity });
            await fetchCart();
            toast({
                title : "Quantity updated",
                description : `Quantity of the item was updated`,
                variant : "default",
            })
        }
        catch(error){
            console.log("An error occurred while updating the quantity of the item in the cart");
            const axiosError = error as AxiosError;
            console.log(axiosError.response?.data);
        }
    }

    const total = cart.reduce((sum, item) => {
        const price = item.product.price || 0;
        const quantity = item.quantity || 0;
        return sum + price * quantity;
    }, 0);
    // const total = 0;

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, total }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
      throw new Error('useCart must be used within a CartProvider')
    }
    return context
}


