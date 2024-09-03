import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FetchProducts() {
  const [productData, setProductData] = useState([]);
  const [error, setError] = useState(null);
  const [productCount, setProductCount] = useState(0); // Add state for product count

  useEffect(() => {
    axios
      .get("http://localhost:8000/product/")
      .then((response) => {
        console.log("Response data:", response.data);
        const products = response.data.data || [];
        setProductData(products);
        setProductCount(products.length); // Update product count
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
      });
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:8000/product/${id}`)
      .then((response) => {
        console.log("Product deleted:", response.data);
        const updatedProducts = productData.filter((product) => product._id !== id);
        setProductData(updatedProducts);
        setProductCount(updatedProducts.length); // Update product count after deletion
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto mt-12">
      <div className="flex flex-col">
        <div className="w-full">
          <div className="bg-white shadow-lg rounded-lg">
            <div className="bg-blue-500 text-white text-center py-4 rounded-t-lg">
              <h4 className="text-lg font-semibold">Products List</h4>
              {/* Display product count */}
              <div className="mt-2 text-white-700 text-xl">
                Total Products: <span className="font-semibold">{productCount}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Id
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Brand
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {productData.length > 0 ? (
                      productData.map((item) => (
                        <tr key={item._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item._id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.brand}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => deleteProduct(item._id)}
                              className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mr-2"
                            >
                              DELETE
                            </button>
                            <Link
                              to={`/edit/${item._id}`}
                              className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              UPDATE
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-gray-100 text-center py-4 rounded-b-lg">
              <h4>
                <Link to="/add" className="text-blue-500 hover:text-blue-600">
                  Add Products
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FetchProducts;
