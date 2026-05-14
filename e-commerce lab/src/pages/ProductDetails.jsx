import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (!response.ok) {
          if (response.status === 404) throw new Error('Product not found');
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">{error || 'Product not found'}</h2>
        <button 
          onClick={() => navigate('/products')}
          className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/products" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white dark:bg-gray-800 p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        {/* Image Section */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 group">
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
          />
          <button className="absolute top-4 right-4 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all hover:scale-110">
            <Heart className={`h-6 w-6 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-300'}`} />
          </button>
        </div>

        {/* Details Section */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="text-sm font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{product.rating} ({product.reviews} reviews)</span>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-auto">
            <p className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
              {Number(product.price).toFixed(2)} <span className="text-xl font-medium text-gray-500">AED</span>
            </p>
            
            <div className="flex gap-4">
              <button className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 px-8 rounded-full font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex justify-center items-center gap-2">
                <ShoppingCart className="h-5 w-5" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;