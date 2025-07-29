'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/lib/types';

interface CartState {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    isInCart: (productId: number) => boolean;
    clearCart: () => void;
}

const CartContext = createContext<CartState | undefined>(undefined);

//hook to access the cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart was called outside of <CartProvider>');
    }
    return context;
};

interface CartProviderProps {
    children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<Product[]>([]);

    // load saved cart from localStorage when component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');

            if (savedCart) {
                try {
                    setCart(JSON.parse(savedCart));
                } catch (error) {
                    console.error('Error loading cart:', error);
                }
            }
        }
    }, []);

    // save cart to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    // add item to cart (prevent duplicates)
    const addToCart = (product: Product) => {
        setCart((prev) => {
            if (prev.some((item) => item.id === product.id)) {
                return prev; // product already exists in cart
            }
            return [...prev, product];
        });
    };

    // remove item from cart by ID
    const removeFromCart = (productId: number) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    // check if a product is already in the cart
    const isInCart = (productId: number): boolean => {
        return cart.some((item) => item.id === productId);
    };

    // clear the entire cart
    const clearCart = () => {
        setCart([]);
    };

    const value: CartState = {
        cart,
        addToCart,
        removeFromCart,
        isInCart,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
