import ProductModel from "../model/productModel.js"; // Import your Mongoose model

const productInsert = async (req, res) => {
  try {
    const { name, brand, price, quantity } = req.body;

    // Validate request body
    if (!name || !brand || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Use .create() to insert a new product
    const newProduct = await ProductModel.create({
      name,
      brand,
      price,
      quantity,
    });

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Product successfully inserted",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error inserting product:", error);

    // Send error response
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Simple Fetch products method
const productGet = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await ProductModel.find();

    // Sending response with fetched products
    return res.status(200).json({
      count: products.length,
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const productDelete = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the product by ID
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    // If product not found
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "Product successfully deleted",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);

    // Error response
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// past
const productUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, price, quantity } = req.body;

    // Building the update object dynamically
    let updateFields = {};

    if (name) updateFields.name = name;
    if (brand) updateFields.brand = brand;
    if (price) updateFields.price = price;
    if (quantity) updateFields.quantity = quantity;

    // Validate that at least one field is provided
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    // Find the product by ID and update it
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    // If product not found
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "Product successfully updated",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);

    // Error response
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Get Specific Product
const getOneProduct = async (req, res) => {
  try {
    // Extract the id from req.params
    const { id } = req.params;

    // Check if id is valid
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Find the product by ID
    const product = await ProductModel.findById(id);
    
    // Check if product was found
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the product data
    return res.status(200).json({
      message: "Successfully fetched product",
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export default {
  productInsert,
  productGet,
  productDelete,
  productUpdate,
  getOneProduct,
};
