import express from 'express';
import { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();
router.route('/').post(createProduct).get(getAllProducts);
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

export default router;
