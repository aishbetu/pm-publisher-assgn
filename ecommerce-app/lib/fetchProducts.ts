// fetchProducts.ts

import useProductStore from './store';
import { Product } from './types';

const fetchProducts = async (skip: number = 0, limit: number = 10) => {
  try {
    const response = await fetch(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`);
    const data = await response.json();
    const { products, total } = data;

    // Map the received data to the required Product structure
    const formattedProducts: Product[] = products.map((product: any) => ({
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
      rating: product.rating,
      category: product.category,
      discountPercentage: product.discountPercentage,
    }));

    // Update the store with the fetched data
    useProductStore.setState((state) => ({
      ...state,
      products: [...state.products, ...formattedProducts], // Append new products to existing ones
      total,
      skip,
      limit,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export default fetchProducts;
