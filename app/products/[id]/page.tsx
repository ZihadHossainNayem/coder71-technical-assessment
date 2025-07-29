'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { fetchProduct } from '@/lib/api';
import Header from '@/components/Header';
import ProtectedRoute from '@/components/ProtectedRoute';
import { FiArrowLeft } from 'react-icons/fi';

export default function ProductDetailsPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();
    const router = useRouter();

    const productId = parseInt(params.id as string);

    // fetch product details on mount or when productId changes
    useEffect(() => {
        const loadProduct = async () => {
            try {
                setIsLoading(true);
                const fetchedProduct = await fetchProduct(productId);
                setProduct(fetchedProduct);
            } catch (err) {
                setError('Failed to load product details. Please try again later.');
                console.error('error loading product:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (productId) {
            loadProduct();
        }
    }, [productId]);

    // navigate back to homepage
    const handleBackToHome = () => {
        router.push('/');
    };

    if (isLoading) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-gray-50">
                    <Header />
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-2 border-t-transparent border-emerald-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading product details...</p>
                        </div>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    if (error || !product) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-gray-50">
                    <Header />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <button
                            onClick={handleBackToHome}
                            className="flex items-center space-x-2 text-emerald-500 hover:text-emerald-600 mb-6"
                        >
                            <FiArrowLeft className="w-4 h-4" />
                            <span>Back to Home</span>
                        </button>

                        <div className="text-center py-12">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                                <p className="text-red-600">{error || 'Product not found'}</p>
                                <button
                                    onClick={handleBackToHome}
                                    className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
                                >
                                    Back to Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
                <Header />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* back button */}
                    <button
                        onClick={handleBackToHome}
                        className="flex items-center space-x-2 text-emerald-500 hover:text-emerald-600 mb-6 transition-colors"
                    >
                        <FiArrowLeft className="w-4 h-4" />
                        <span>Back to Home</span>
                    </button>

                    {/* product details */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
                            {/* image */}
                            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-contain p-8"
                                    priority
                                />
                            </div>

                            {/* info */}
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-2">
                                        {product.title}
                                    </h1>

                                    <div className="flex items-center space-x-4 mb-4">
                                        <span className="text-3xl font-bold text-emerald-500">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <span className="text-yellow-400">★</span>
                                            <span className="ml-1">{product.rating.rate}</span>
                                            <span className="ml-1">({product.rating.count} reviews)</span>
                                        </div>
                                    </div>

                                    <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                        {product.category}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
