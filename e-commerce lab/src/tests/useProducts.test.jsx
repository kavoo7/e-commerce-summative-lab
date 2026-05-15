import { renderHook, act } from '@testing-library/react';
import { useProducts } from '../Hooks/UseProduct';

describe('useProducts hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads products and allows adding a new product', async () => {
    const { result } = renderHook(() => useProducts());
    
    // Wait for the initial load
    expect(result.current.loading).toBe(true);
    
    // Test adding a product
    await act(async () => {
      await result.current.addProduct({
        name: 'Hook Test Product',
        price: 50
      });
    });

    expect(result.current.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Hook Test Product', price: 50 })
      ])
    );
  });
});
