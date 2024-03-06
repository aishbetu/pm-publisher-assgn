'use client'
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon from react-icons/fa
import useProductStore from '@/lib/store';

const HomeLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [productCount, setProductCount] = useState<number>(0); // Local state to store product count

    // Subscribe to the entire product store state
    useEffect(() => {
        const unsubscribe = useProductStore.subscribe(
            (state) => setProductCount(state.productCount)
        );

        // Unsubscribe from the store when component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <header className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
                <h1 className="text-2xl font-semibold">My Shop</h1>
                <div className="flex items-center">
                    <FaShoppingCart className="mr-2" />
                    <span>Cart ({productCount})</span> {/* Display product count */}
                </div>
            </header>
            <main>{children}</main>
            {/* <footer className="bg-gray-800 text-white py-4 px-8">This is the footer for the home pages</footer> */}
        </div>
    );
};

export default HomeLayout;
