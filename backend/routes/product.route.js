import express from 'express'
import mongoose from 'mongoose';
const router = express.Router();
import Product from '../model/product.model.js'; // Import Product model
import { createProducts, deleteProducts, getProducts, UpdateProducts } from '../controllers/product.controller.js';


router.get('/', getProducts)
router.post('/', createProducts);
router.put('/:id', UpdateProducts)
router.delete('/:id', deleteProducts)

export default router;