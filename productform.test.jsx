import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const mockProduct = {
  id: "1",
  name: "Test Jacket",
  description: "A nice jacket",
  price: 150.00,
  category: "Jackets",
  rating: 4.5,
  reviews: 10,
  image: "https://example.com/image.jpg",
  isFavorite: false
};

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('ProductCard Component', () => {
  it('renders product details correctly', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Jacket')).toBeInTheDocument();
    expect(screen.getByText(/150.00/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Test Jacket/i })).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders a link to the product details page', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    
    const link = screen.getByRole('link', { name: /Test Jacket/i });
    expect(link).toHaveAttribute('href', '/products/1');
  });
});