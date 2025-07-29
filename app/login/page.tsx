'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    // handles login form submission
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const success = await login(username, password);
            if (success) {
                router.push('/');
            } else {
                setError('invalid username or password');
            }
        } catch {
            setError('login failed, please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
                    <p className="mt-2 text-sm text-gray-600">Access product catalog</p>
                </div>

                {/* login form */}
                <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
                    <div className="space-y-4">
                        {/* username input */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Enter your username"
                            />
                        </div>

                        {/* password input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    {/* error message display */}
                    {error && <div className="text-red-600 text-sm text-center">{error}</div>}

                    {/* form submit button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    {/* demo credentials */}
                    <div className="text-center text-sm text-gray-600">
                        <p>
                            Username: <span className="text-lg font-bold text-red-400">demo</span> | Password:{' '}
                            <span className="text-lg font-bold text-red-400">demo</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
