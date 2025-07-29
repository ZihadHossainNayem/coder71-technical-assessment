'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/lib/types';

interface FavoritesState {
    favorites: Product[];
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (productId: number) => void;
    isFavorite: (productId: number) => boolean;
    clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesState | undefined>(undefined);

//hook to access the favorites context
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites was called outside of <FavoritesProvider>');
    }
    return context;
};

interface FavoritesProviderProps {
    children: React.ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
    const [favorites, setFavorites] = useState<Product[]>([]);

    // Load favorites from localStorage on component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedFavorites = localStorage.getItem('favorites');

            if (savedFavorites) {
                try {
                    setFavorites(JSON.parse(savedFavorites));
                } catch (error) {
                    console.error('Error loading favorites:', error);
                }
            }
        }
    }, []);

    // save favorites to localStorage when the list changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites]);

    // add a product to favorites if it's not already present
    const addToFavorites = (product: Product) => {
        setFavorites((prev) => {
            if (prev.some((item) => item.id === product.id)) {
                return prev; // already added
            }
            return [...prev, product];
        });
    };

    // remove a product from favorites by ID
    const removeFromFavorites = (productId: number) => {
        setFavorites((prev) => prev.filter((item) => item.id !== productId));
    };

    // check if a product is in the favorites list
    const isFavorite = (productId: number): boolean => {
        return favorites.some((item) => item.id === productId);
    };

    // clear the entire favorites list
    const clearFavorites = () => {
        setFavorites([]);
    };

    const value: FavoritesState = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites,
    };

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
