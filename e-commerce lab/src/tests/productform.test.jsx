import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from '../component/productform';

describe('ProductForm Component', () => {
  it('renders correctly for adding a product', () => {
    render(<ProductForm onSubmit={() => {}} />);
    
    expect(screen.getByText('Add New Product')).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
  });

  it('submits form data correctly', () => {
    const mockSubmit = vi.fn();
    render(<ProductForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Test Category' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '99.99' } });
    fireEvent.change(screen.getByLabelText(/Image URL/i), { target: { value: 'http://example.com/image.jpg' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Add Product/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'Test Product',
      category: 'Test Category',
      price: 99.99,
      image: 'http://example.com/image.jpg',
      description: 'Test Description',
      rating: 0,
      reviews: 0,
      isFavorite: false
    });
  });
});