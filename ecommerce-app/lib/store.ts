import { create } from "zustand";
import { Product, ProductStore } from "./types";

const useProductStore = create<ProductStore>((set, getState) => ({
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
    productCount: 0,
    setProducts: (products: Product[]) => set({ products }),
    setTotal: (total: number) => set({ total }),
    setSkip: (skip: number) => set({ skip }),
    setLimit: (limit: number) => set({ limit }),
    getProductById: (id: number) => {
        const { products } = getState();
        return products.find((product) => product.id === id);
      },
    incrementProductCount: () => set((state) => ({ ...state, productCount: state.productCount + 1 })),
}));

export default useProductStore;