import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddProducts() {
  const [name, setProductName] = useState("");
  const [brand, setProductBrand] = useState("");
  const [price, setProductPrice] = useState("");
  const [quantity, setProductQuantity] = useState("");

  const addProduct = (e) => {
    e.preventDefault();

    const productData = {
      name,
      brand,
      price,
      quantity
    };

    axios.post("http://localhost:8000/product/", productData)
      .then((response) => {
        console.log("Product added successfully", response.data);
        setProductName("");
        setProductBrand("");
        setProductPrice("");
        setProductQuantity("");
      })
      .catch((error) => {
        console.error("Error adding product", error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className="container mx-auto mt-12">
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <div className="bg-white shadow-lg rounded-lg">
            <div className="bg-blue-500 text-white text-center py-4 rounded-t-lg">
              <h4 className="text-lg font-semibold">Add Products</h4>
            </div>
            <div className="p-6">
              <form onSubmit={addProduct}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter Product Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Product Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    placeholder="Enter Product Price"
                    value={price}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="quantity"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Product Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    placeholder="Enter Product Quantity"
                    value={quantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="brand"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Product Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    placeholder="Enter Product Brand"
                    value={brand}
                    onChange={(e) => setProductBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="text-center mt-4">
            <h4>
              <Link to="/" className="text-blue-500 hover:text-blue-600">
                View Products
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProducts;
