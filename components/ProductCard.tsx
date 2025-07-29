'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

interface ProductCardProps {
    product: Product;
    onViewDetails: (id: number) => void;
    onToggleFavorite?: (product: Product) => void;
    isFavorite?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, onToggleFavorite, isFavorite = false }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
            {/* image */}
            <div className="relative aspect-square bg-gray-50">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* favorite */}
                {onToggleFavorite && (
                    <button
                        onClick={() => onToggleFavorite(product)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                    >
                        {isFavorite ? (
                            <FaHeart className="w-4 h-4 text-red-500" />
                        ) : (
                            <FiHeart className="w-4 h-4 text-gray-400" />
                        )}
                    </button>
                )}
            </div>

            {/* product info */}
            <div className="p-4 flex flex-col flex-1">
                {/* product title */}
                <div className="h-10 mb-3">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-5">{product.title}</h3>
                </div>

                {/* product price */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                    <div className="flex items-center text-sm text-gray-500">
                        <span>★ {product.rating.rate}</span>
                        <span className="ml-1">({product.rating.count})</span>
                    </div>
                </div>

                {/* buttons */}
                <div className="mt-auto">
                    <button
                        onClick={() => onViewDetails(product.id)}
                        className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-emerald-600 transition-colors"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
