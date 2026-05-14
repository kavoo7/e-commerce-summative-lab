  
  import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="group relative flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-sm"
          aria-label="Add to wishlist"
        >
          <Heart className={`h-5 w-5 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-300'}`} />
        </button>
      </div>
      
      <div className="flex flex-col flex-grow">
        <Link to={`/products/${product.id}`} className="hover:underline">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-blue-600 dark:text-blue-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews})</span>
        </div>
        
        <div className="mt-auto flex items-end justify-between">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {Number(product.price).toFixed(2)} <span className="text-sm font-normal">AED</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;