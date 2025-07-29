'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types';
import { fetchProducts } from '@/lib/api';
import Header from '@/components/Header';
import SearchBar from '@/components/Searchbar';
import ProductCard from '@/components/ProductCard';

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const router = useRouter();

    // fetch products on mount
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setIsLoading(true);
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
                setFilteredProducts(fetchedProducts);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                console.error('error loading products:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, []);

    // filter products based on search query
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchQuery, products]);

    // update search query state from searchbar
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // navigate to product detail page
    const handleViewDetails = (productId: number) => {
        router.push(`/products/${productId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* search */}
                <div className="mb-8">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Catalog</h1>
                        <p className="text-gray-600">Discover amazing products from our collection</p>
                    </div>
                    <SearchBar onSearch={handleSearch} placeholder="Search products by title..." />
                </div>

                {/* loading */}
                {isLoading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading products...</p>
                        </div>
                    </div>
                )}

                {/* error */}
                {error && (
                    <div className="text-center py-12">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                            <p className="text-red-600">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* no results */}
                {!isLoading && !error && filteredProducts.length === 0 && searchQuery && (
                    <div className="text-center py-12">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
                            <p className="text-gray-600">No products found for "{searchQuery}"</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
                            >
                                Clear Search
                            </button>
                        </div>
                    </div>
                )}

                {/* products */}
                {!isLoading && !error && filteredProducts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} onViewDetails={handleViewDetails} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
