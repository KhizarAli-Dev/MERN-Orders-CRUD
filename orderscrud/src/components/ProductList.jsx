import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('http://localhost:8000/product/')
      .then(response => {
        console.log('API Response:', response.data); // Log the response to check data format
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

  // Render loading, error, or product data
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto mt-12">
      <div className="flex flex-col">
        <div className="w-full">
          <div className="bg-white shadow-lg rounded-lg">
            <div className="bg-blue-500 text-white text-center py-4 rounded-t-lg">
              <h4 className="text-lg font-semibold">Products List</h4>
            </div>
            <div className="p-6">
              <ul className="list-disc pl-6">
                {products.length > 0 ? (
                  products.map(product => (
                    <li key={product._id} className="mb-4">
                      <h5 className="text-xl font-bold">{product.name}</h5>
                      <p><strong>Brand:</strong> {product.brand}</p>
                      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                      <p><strong>Quantity:</strong> {product.quantity}</p>
                    </li>
                  ))
                ) : (
                  <p>No products available.</p>
                )}
              </ul>
            </div>
            <div className="bg-gray-100 text-center py-4 rounded-b-lg">
              <h4>
                <a href="/add" className="text-blue-500 hover:text-blue-600">
                  Add Products
                </a>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
