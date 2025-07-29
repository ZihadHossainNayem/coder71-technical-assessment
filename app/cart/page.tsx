'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import ProtectedRoute from '@/components/ProtectedRoute';
import { FiArrowLeft, FiTrash2, FiShoppingCart } from 'react-icons/fi';

export default function CartPage() {
    const { cart, removeFromCart } = useCart();
    const router = useRouter();

    const handleBackToHome = () => {
        router.push('/');
    };

    // navigate to product details page
    const handleViewProduct = (productId: number) => {
        router.push(`/products/${productId}`);
    };

    // remove a product from the cart
    const handleRemoveFromCart = (productId: number) => {
        removeFromCart(productId);
    };

    // calculate total price of cart items
    const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);

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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                        <p className="text-gray-600">
                            {cart.length === 0
                                ? 'Your cart is empty'
                                : `${cart.length} item${cart.length !== 1 ? 's' : ''} in your cart`}
                        </p>
                    </div>

                    {/* empty cart */}
                    {cart.length === 0 && (
                        <div className="text-center py-12">
                            <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FiShoppingCart className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                                <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
                                <button
                                    onClick={handleBackToHome}
                                    className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-md hover:bg-emerald-600 transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    )}

                    {/* cart items */}
                    {cart.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* items list */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="divide-y divide-gray-200">
                                        {cart.map((product) => (
                                            <div key={product.id} className="p-6">
                                                <div className="flex items-start space-x-4">
                                                    {/* image */}
                                                    <div className="flex-shrink-0 w-20 h-20 bg-gray-50 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={product.image}
                                                            alt={product.title}
                                                            width={80}
                                                            height={80}
                                                            className="w-full h-full object-contain p-2"
                                                        />
                                                    </div>

                                                    {/* details */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="h-10 mb-1">
                                                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-5">
                                                                {product.title}
                                                            </h3>
                                                        </div>
                                                        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-lg font-semibold text-emerald-500">
                                                                ${product.price.toFixed(2)}
                                                            </span>
                                                            <div className="flex items-center text-sm text-gray-500">
                                                                <span>★ {product.rating.rate}</span>
                                                                <span className="ml-1">({product.rating.count})</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* buttons */}
                                                    <div className="flex flex-col space-y-2">
                                                        <button
                                                            onClick={() => handleViewProduct(product.id)}
                                                            className="text-sm text-emerald-500 hover:text-emerald-600 transition-colors"
                                                        >
                                                            View Details
                                                        </button>
                                                        <button
                                                            onClick={() => handleRemoveFromCart(product.id)}
                                                            className="flex items-center space-x-1 text-sm text-red-500 hover:text-red-600 transition-colors"
                                                        >
                                                            <FiTrash2 className="w-3 h-3" />
                                                            <span>Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Items ({cart.length})</span>
                                            <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="text-emerald-500">Free</span>
                                        </div>
                                        <div className="border-t pt-3">
                                            <div className="flex justify-between">
                                                <span className="text-base font-semibold text-gray-900">Total</span>
                                                <span className="text-lg font-bold text-emerald-500">
                                                    ${totalPrice.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        className="w-full py-3 px-6 bg-emerald-500 text-white font-medium rounded-md hover:bg-emerald-600 transition-colors mb-3"
                                        onClick={() => alert('Checkout functionality would be implemented here')}
                                    >
                                        Proceed to Checkout
                                    </button>

                                    <button
                                        onClick={handleBackToHome}
                                        className="w-full py-2 px-6 text-emerald-500 font-medium rounded-md hover:bg-emerald-50 transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </ProtectedRoute>
    );
}
