import axios from 'axios';
import { Product } from './types';

const cache = new Map<string, { data: unknown; timestamp: number }>();

// cache for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
});

// check to see if data is cached
const getCachedData = <T>(key: string): T | null => {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data as T;
    }
    return null;
};

const setCachedData = <T>(key: string, data: T) => {
    cache.set(key, { data, timestamp: Date.now() });
};

// get all products
export const fetchProducts = async (): Promise<Product[]> => {
    const cacheKey = 'products';
    const cached = getCachedData<Product[]>(cacheKey);

    if (cached) {
        return cached;
    }

    try {
        const response = await api.get('/products');
        const products = response.data;
        setCachedData(cacheKey, products);
        return products;
    } catch (error) {
        console.error('error fetching products:', error);
        throw new Error('failed to fetch products');
    }
};

// get single product by id
export const fetchProduct = async (id: number): Promise<Product> => {
    const cacheKey = `product-${id}`;
    const cached = getCachedData<Product>(cacheKey);

    if (cached) {
        return cached;
    }

    try {
        const response = await api.get(`/products/${id}`);
        const product = response.data;
        setCachedData(cacheKey, product);
        return product;
    } catch (error) {
        console.error(`error fetching product ${id}:`, error);
        throw new Error('failed to fetch product');
    }
};

export default api;
