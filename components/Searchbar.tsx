'use client';

import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
    onSearch: (query: string) => void; // callback when search query changes
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = 'Search products...' }) => {
    const [query, setQuery] = useState('');

    // debounce search to avoid excessive calls
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 300); // 300 ms delay

        // cleanup timeout for query changes before delay ends
        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return (
        <div className="relative max-w-md mx-auto">
            <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                {/* search input */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
            </div>
        </div>
    );
};

export default SearchBar;
