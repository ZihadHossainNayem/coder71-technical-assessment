export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface User {
    id: number;
    username: string;
    token: string;
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}
