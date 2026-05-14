import { useState } from 'react';
import { useProducts } from '../Hooks/UseProduct';
import ProductForm from '../component/productform';
import { Edit2, Trash2 } from 'lucide-react';

const AdminPage = () => {
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddSubmit = async (data) => {
    try {
      await addProduct({ ...data, id: String(Date.now()) });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (data) => {
    try {
      await updateProduct(editingProduct.id, data);
      setEditingProduct(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your store products, add new inventory, and update details.</p>
      </div>

      <div className="mb-10">
        <ProductForm 
          onSubmit={editingProduct ? handleEditSubmit : handleAddSubmit} 
          initialData={editingProduct}
          isEditing={!!editingProduct}
          onCancel={() => setEditingProduct(null)}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Current Inventory</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="p-4 font-semibold text-gray-900 dark:text-white">Product</th>
                  <th className="p-4 font-semibold text-gray-900 dark:text-white">Category</th>
                  <th className="p-4 font-semibold text-gray-900 dark:text-white">Price (AED)</th>
                  <th className="p-4 font-semibold text-gray-900 dark:text-white text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{product.category}</td>
                    <td className="p-4 font-medium text-gray-900 dark:text-white">{Number(product.price).toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => {
                          setEditingProduct(product);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors mr-2"
                        title="Edit Product"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500 dark:text-gray-400">
                      No products in inventory.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;