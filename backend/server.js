import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Import database connection

import productRoutes from "./routes/product.route.js";
dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000; // Use port from env or default to 5000

app.use(express.json()); // Middleware for parsing JSON
app.use("/api/products", productRoutes)
// Start the server and connect to the database
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on port http://localhost:${PORT}`);
});
