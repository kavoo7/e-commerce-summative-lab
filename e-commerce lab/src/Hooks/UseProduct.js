import { useState, useEffect, useCallback } from 'react';
import mockProducts from '../data/mockProducts';

const STORAGE_KEY = 'ecommerce_lab_products';

const loadProductsFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to load products from localStorage:', error);
  }
  return mockProducts;
};

const saveProductsToStorage = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.warn('Failed to save products to localStorage:', error);
  }
};

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const initialProducts = loadProductsFromStorage();
      setProducts(initialProducts);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStoredProducts = useCallback((nextProducts) => {
    if (typeof nextProducts === 'function') {
      setProducts((prev) => {
        const updatedProducts = nextProducts(prev);
        saveProductsToStorage(updatedProducts);
        return updatedProducts;
      });
    } else {
      setProducts(nextProducts);
      saveProductsToStorage(nextProducts);
    }
  }, []);

  const addProduct = async (productData) => {
    const newProduct = {
      ...productData,
      id: String(Date.now()),
    };

    updateStoredProducts((prev) => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = async (id, updates) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, ...updates } : product
    );

    updateStoredProducts(updatedProducts);
    return updatedProducts.find((product) => product.id === id);
  };

  const deleteProduct = async (id) => {
    const filteredProducts = products.filter((product) => product.id !== id);
    updateStoredProducts(filteredProducts);
  };

  const refreshProducts = () => {
    setLoading(true);
    try {
      const stored = loadProductsFromStorage();
      setProducts(stored);
      setError(null);
    } catch (err) {
      setError('Failed to refresh products');
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshProducts,
  };
};
