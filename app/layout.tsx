import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { CartProvider } from '@/context/CartContext';

const poppins = Poppins({
    variable: '--font-poppins',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: 'Product Catalog',
    description: 'Browse products from our catalog',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} antialiased  text-gray-900 bg-gray-50`}>
                <AuthProvider>
                    <FavoritesProvider>
                        <CartProvider>{children}</CartProvider>
                    </FavoritesProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
