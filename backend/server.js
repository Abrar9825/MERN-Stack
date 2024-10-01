import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Import database connection
import Product from './model/product.model.js'; // Import Product model

dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 5000; // Use port from env or default to 5000

app.use(express.json()); // Middleware for parsing JSON

app.post('/api/products', async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Provide All Fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create Product", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// Start the server and connect to the database
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on port ${PORT}`);
});
