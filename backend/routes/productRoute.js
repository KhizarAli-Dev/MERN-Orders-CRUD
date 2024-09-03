import express from "express";
import productController from "../controller/productController.js";

const router = express.Router();

router.post('/', productController.productInsert);
// Define route for GET request
router.get('/', productController.productGet);
router.delete('/:id', productController.productDelete);
router.put('/:id', productController.productUpdate);
router.get('/:id', productController.getOneProduct);




export default router;