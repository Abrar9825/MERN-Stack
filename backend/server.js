import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Import database connection
import cors from 'cors';
import path from 'path'

import productRoutes from "./routes/product.route.js";
dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001; // Use port from env or default to 5000
app.use(cors());


const __dirname = path.resolve()
app.use(express.json()); // Middleware for parsing JSON
app.use("/api/products", productRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

// Start the server and connect to the database
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on port http://localhost:${PORT}`);
});
