import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

function EditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    brand: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/product/${id}`)
      .then(response => {
        setProduct(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product details');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/product/${id}`, product)
      .then(response => {
        console.log('Product updated:', response.data);
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating product:', error);
        setError('Failed to update product');
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto mt-12">
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <div className="bg-white shadow-lg rounded-lg">
            <div className="bg-blue-500 text-white text-center py-4 rounded-t-lg">
              <h4 className="text-lg font-semibold">Edit Product</h4>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter Product Name"
                    value={product.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="block text-gray-700 text-sm font-medium mb-2">Product Price</label>
                  <input
                    type="text"
                    id="price"
                    placeholder="Product Price"
                    value={product.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="quantity" className="block text-gray-700 text-sm font-medium mb-2">Product Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    placeholder="Product Quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="brand" className="block text-gray-700 text-sm font-medium mb-2">Product Brand</label>
                  <input
                    type="text"
                    id="brand"
                    placeholder="Product Brand"
                    value={product.brand}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="text-center mt-4">
            <h4>
              <Link to="/" className="text-blue-500 hover:text-blue-600">View Products</Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProducts;
