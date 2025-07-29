# Product Catalog

A responsive product catalog with authentication, search, favorites, and shopping cart functionality, including authentication, state management, performance optimization, and clean architecture.

## 🚀 Live Demo

[View Live Application](https://coder71-technical-assessment.vercel.app)

## 📋 Features

### Core Functionality

-   **Product Catalog**: Browse products fetched from the Fake Store API
-   **Product Details**: View detailed information for each product with dynamic routing
-   **Real-time Search**: Filter products by title with instant results
-   **Authentication**: Secure login system with JWT-based token management
-   **Protected Routes**: Access control for authenticated users only

### User Features

-   **Favorites System**: Save and manage favorite products
-   **Shopping Cart**: Add/remove items with persistent storage
-   **Responsive Design**: Optimized for desktop, tablet, and mobile devices
-   **Loading States**: Smooth loading indicators and error handling
-   **Persistent State**: Cart and favorites persist across sessions

### Technical Features

-   **API Caching**: 5-minute cache for improved performance
-   **Image Optimization**: Next.js Image component with proper sizing
-   **TypeScript**: Full type safety throughout the application
-   **Context API**: Centralized state management for auth, cart, and favorites
-   **Error Boundaries**: Graceful error handling and user feedback

## 🛠 Tech Stack

-   **Framework**: Next.js 15 with App Router
-   **Frontend**: React 19, TypeScript
-   **Styling**: Tailwind CSS 4
-   **Icons**: React Icons (Feather Icons)
-   **HTTP Client**: Axios
-   **State Management**: React Context API
-   **Authentication**: Custom JWT implementation
-   **API**: Fake Store API (https://fakestoreapi.com)

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart page
│   ├── favorites/         # Favorites page
│   ├── login/             # Authentication page
│   ├── products/[id]/     # Dynamic product details
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── Header.tsx         # Navigation header
│   ├── ProductCard.tsx    # Product display card
│   ├── ProtectedRoute.tsx # Route protection wrapper
│   └── Searchbar.tsx      # Search input component
├── context/               # React Context providers
│   ├── AuthContext.tsx    # Authentication state
│   ├── CartContext.tsx    # Shopping cart state
│   └── FavoritesContext.tsx # Favorites state
├── lib/                   # Utility functions and types
│   ├── api.ts             # API client with caching
│   ├── auth.ts            # Authentication utilities
│   └── types.ts           # TypeScript type definitions
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn package manager

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/ZihadHossainNayem/coder71-technical-assessment.git
    cd coder71-technical-assessment
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials

-   **Username**: `demo`
-   **Password**: `demo`

## 🏗 Architecture Decisions

### State Management

-   **Context API**: Chosen over Redux for simplicity and built-in React integration
-   **Persistent Storage**: localStorage for cart and favorites to maintain state across sessions
-   **Authentication State**: Centralized auth context with token-based authentication

### Performance Optimizations

-   **API Caching**: In-memory cache with 5-minute TTL to reduce API calls
-   **Image Optimization**: Next.js Image component with proper sizing and lazy loading
-   **Code Splitting**: Automatic code splitting with Next.js App Router
-   **Client-Side Rendering**: Used for interactive features while maintaining fast initial loads

### Security

-   **Protected Routes**: HOC pattern for route protection
-   **Token Validation**: JWT token expiration and validation
-   **Input Sanitization**: Proper form validation and error handling

## 🎨 UI/UX Design

-   **Design System**: Consistent color palette with emerald green as primary color
-   **Typography**: Poppins font family for modern, readable text
-   **Responsive Grid**: CSS Grid and Flexbox for responsive layouts
-   **Interactive States**: Hover effects, loading states, and smooth transitions
-   **Accessibility**: Semantic HTML, proper ARIA labels, and keyboard navigation

## 📱 Responsive Design

-   **Mobile First**: Designed for mobile devices with progressive enhancement
-   **Breakpoints**:
    -   Mobile: < 640px
    -   Tablet: 640px - 1024px
    -   Desktop: > 1024px
-   **Grid System**: Responsive product grid (1-4 columns based on screen size)

## 🔄 Future Enhancements

-   [ ] Unit and integration tests with Jest/React Testing Library
-   [ ] Product filtering by category and price range
-   [ ] Pagination for large product lists
-   [ ] Product quantity management in cart
