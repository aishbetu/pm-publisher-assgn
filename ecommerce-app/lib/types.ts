// types.ts

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }
  
  export interface ProductStore {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
    productCount: number;
    setProducts: (products: Product[]) => void;
    setTotal: (total: number) => void;
    setSkip: (skip: number) => void;
    setLimit: (limit: number) => void;
    getProductById: (id: number) => Product | undefined; // Ensure getProductById is included
    incrementProductCount: () => void;
  }
  