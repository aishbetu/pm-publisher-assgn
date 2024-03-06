'use client'
import React, { useEffect } from 'react';
import { Box, Button, CircularProgress } from '@chakra-ui/react';
import useProductStore from '@/lib/store';
import fetchProducts from '@/lib/fetchProducts';
import { useRouter } from 'next/navigation';
import HomeLayout from './HomeLayout';
const HomePage: React.FC = () => {
  const { products, total, skip, limit } = useProductStore();
  const router = useRouter();
  useEffect(() => {
    fetchProducts(); // Fetch initial products when the component mounts
  }, []);

  const handleScroll = () => {
    // Check if the user has scrolled to the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
    ) {
      // Fetch more products when user reaches the bottom
      if (products.length < total) {
        fetchProducts(skip + limit); // Fetch next set of products
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [products]); // Reattach scroll event listener when products change

  const handleProductDetailsClick = (productId: number) => {
    // Navigate to the product details page and pass the product ID as a route parameter
    router.push(`/home/details/${productId}`);
  };

  return (
    <HomeLayout>
    <div className="flex flex-col items-center">
      <h1 className="mt-5 mb-10 text-[48px]">Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className='my-5'>
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Category: {product.category}</p>
            <p>Discount: {product.discountPercentage}%</p>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleProductDetailsClick(product.id)}>
              View Details
            </button>
          </li>
        ))}
      </ul>
      {/* Show loading indicator when fetching more products */}
      {products.length < total && <Box textAlign="center"><CircularProgress isIndeterminate color="green.300" /></Box>}
    </div>
  </HomeLayout>
  );
};

export default HomePage;
