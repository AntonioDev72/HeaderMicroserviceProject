import CurrentProduct from '../models/ProductModel.js';
import catchAsync from '../middleware/catchAsync.js';
import AppError from '../utils/appError.js';

export const createProduct = catchAsync(async function (req, res, next) {
    const newItem = await CurrentProduct.create(req.body);
    res.status(201).json({ status: "success", data: newItem });
});

export const getAllProducts = catchAsync(async function (req, res, next) {
    const data = await CurrentProduct.find({});
    res.status(200).json({ status: "success", data: data });
});

export const getProduct = catchAsync(async function (req, res, next) {
    const product = await CurrentProduct.findById(req.params.id);
    if (!product) return next(new AppError('product not found', 404));
    res.status(200).json({ status: "success", data: product });
});

export const updateProduct = catchAsync(async function (req, res, next) {
    const updatedProduct = await CurrentProduct.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProduct) return next(new AppError('product not found', 404));
    res.status(200).json({ status: "success", data: updatedProduct });
});

export const deleteProduct = catchAsync(async function (req, res, next) {
    const deletedProduct = await CurrentProduct.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return next(new AppError('product not found', 404));
    res.status(200).json({ status: "success", data: deletedProduct });
});
