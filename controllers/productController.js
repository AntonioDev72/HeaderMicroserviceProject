import CurrentProduct from '../models/ProductModel.js';

export async function createProduct(req, res, next) {
    try {
        const newItem = await CurrentProduct.create(req.body);
        res.status(201).json({ status: "success", data: newItem });
    } catch (err) {
        res.status(400).json({ status: "fail", message: "error: " + err });
    }
}

export async function getAllProducts(req, res, next) {
    try {
        const data = await CurrentProduct.find({});
        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.status(404).json({ status: "fail", message: "error: " + err });
    }
}

export async function getProduct(req, res, next) {
    try {
        const product = await CurrentProduct.findById(req.params.id);
        if (!product) return res.status(404).json({ status: "fail", message: "product not found" });
        res.status(200).json({ status: "success", data: product });
    } catch (err) {
        res.status(400).json({ status: "fail", message: "error: " + err });
    }
}

export async function updateProduct(req, res, next) {
    try {
        const updatedProduct = await CurrentProduct.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) return res.status(404).json({ status: "fail", message: "product not found" });
        res.status(200).json({ status: "success", data: updatedProduct });
    } catch (err) {
        res.status(400).json({ status: "fail", message: "error: " + err });
    }
}

export async function deleteProduct(req, res, next) {
    try {
        const deletedProduct = await CurrentProduct.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ status: "fail", message: "product not found" });
        res.status(200).json({ status: "success", data: deletedProduct });
    } catch (err) {
        res.status(400).json({ status: "fail", message: "error: " + err });
    }
}
