'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useFavorites } from '@/context/FavoritesContext';
import Header from '@/components/Header';
import ProtectedRoute from '@/components/ProtectedRoute';
import { FiArrowLeft, FiTrash2, FiHeart } from 'react-icons/fi';

export default function FavoritesPage() {
    const { favorites, removeFromFavorites } = useFavorites();
    const router = useRouter();

    const handleBackToHome = () => {
        router.push('/');
    };

    // navigate to the product details page
    const handleViewProduct = (productId: number) => {
        router.push(`/products/${productId}`);
    };

    // remove a product from favorites
    const handleRemoveFromFavorites = (productId: number) => {
        removeFromFavorites(productId);
    };

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

                    {/* title */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
                        <p className="text-gray-600">
                            {favorites.length === 0
                                ? "You haven't added any favorites yet"
                                : `${favorites.length} favorite${favorites.length !== 1 ? 's' : ''}`}
                        </p>
                    </div>

                    {/* empty favorites */}
                    {favorites.length === 0 && (
                        <div className="text-center py-12">
                            <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FiHeart className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
                                <p className="text-gray-600 mb-6">
                                    Start browsing products and add them to your favorites
                                </p>
                                <button
                                    onClick={handleBackToHome}
                                    className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-md hover:bg-emerald-600 transition-colors"
                                >
                                    Browse Products
                                </button>
                            </div>
                        </div>
                    )}

                    {/* favorites grid */}
                    {favorites.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {favorites.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    {/* image */}
                                    <div className="relative aspect-square bg-gray-50">
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            className="object-contain p-4"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />

                                        {/* remove button */}
                                        <button
                                            onClick={() => handleRemoveFromFavorites(product.id)}
                                            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <FiTrash2 className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>

                                    {/* info */}
                                    <div className="p-4">
                                        <div className="h-10 mb-3">
                                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-5">
                                                {product.title}
                                            </h3>
                                        </div>

                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-lg font-semibold text-emerald-500">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <span>★ {product.rating.rate}</span>
                                                <span className="ml-1">({product.rating.count})</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleViewProduct(product.id)}
                                            className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-emerald-600 transition-colors"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </ProtectedRoute>
    );
}
