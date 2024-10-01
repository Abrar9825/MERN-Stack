import mongoose from 'mongoose';
import Product from '../model/product.model.js'


export const getProducts = async (req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json({ success: true, data: product });

    } catch (error) {
        console.log("Error in Fetching Product", error);
        res.status(500).json({ success: false, message: "Server Error" });

    }
}
export const createProducts = async (req, res) => {
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
}
export const UpdateProducts = async (req, res) => {
    const { id } = req.params
    const product = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "InValid Product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })//new is used for give the data after update
        res.status(200).json({ success: true, data: updatedProduct });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });

    }

}
export const deleteProducts = async (req, res) => {
    const { id } = req.params
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Data is Deleted" });

    } catch (error) {
        console.error("Error in Deleting Product", error);
        res.status(404).json({ success: false, message: "Product Not Found" });

    }

}