'use client'
import React, { useEffect } from 'react';
import { Box, Button, CircularProgress } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import useProductStore from '@/lib/store';
import HomeLayout from '../../HomeLayout';

const ProductDetailsPage: React.FC = () => {
  const pathname = usePathname();
  const  productID  = pathname.split('/')[3];
  const product = useProductStore((state) => state.getProductById(parseInt(productID as string)));
  const incrementProductCount = useProductStore((state) => state.incrementProductCount);

  useEffect(() => {
    if (productID) {
      // Fetch product details based on productID
      console.log('Fetching product details for product ID:', productID);
    }
  }, [productID]);

  const handleAddToCart = () => {
    // Call the action to increment product count for cart
    incrementProductCount();
  };

  if (!productID || !product) {
    // Product details not available yet
    return (
      <Box textAlign="center">
        <CircularProgress isIndeterminate color="green.300" />
      </Box>
    );
  }

  return (
    <HomeLayout>
    <div className="mx-auto max-w-lg p-4">
    <h1 className="text-3xl font-semibold mb-4">Product Details</h1>
    <img src={product.thumbnail} alt={product.title} className="w-full mb-4 rounded-lg" />
    <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
    <p className="text-lg mb-2">Price: ${product.price}</p>
    <p className="text-lg mb-2">Rating: {product.rating}</p>
    <p className="text-lg mb-2">Category: {product.category}</p>
    <p className="text-lg mb-2">Discount: {product.discountPercentage}%</p>
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddToCart}>
      Add To Cart
    </button>

    </div>
    </HomeLayout>
  );
};

export default ProductDetailsPage;
