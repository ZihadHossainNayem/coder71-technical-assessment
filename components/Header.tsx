'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FiUser, FiLogOut } from 'react-icons/fi';

const Header: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* logo */}
                    <Link href="/" className="flex items-center">
                        <h1 className="text-xl font-semibold text-gray-900">Product Catalog</h1>
                    </Link>

                    {/* nav section*/}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            // show username and logout if logged in
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <FiUser className="w-4 h-4" />
                                    <span>{user.username}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
                                >
                                    <FiLogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            // show login button if not logged in
                            <Link
                                href="/login"
                                className="flex items-center space-x-1 px-4 py-2 text-sm bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors cursor-pointer"
                            >
                                <FiUser className="w-4 h-4" />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
