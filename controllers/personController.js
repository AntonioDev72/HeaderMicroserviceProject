import PersonModel from '../models/PersonModel.js';
import catchAsync from '../middleware/catchAsync.js';
import AppError from '../utils/appError.js';

export const createPerson = catchAsync(async function (req, res, next) {
    const newPerson = await PersonModel.create(req.body);
    res.status(201).json({ status: "success", data: newPerson });
});

export const getAllPersons = catchAsync(async function (req, res, next) {
    const queryObj = { ...req.query };
    delete queryObj.sort;
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    const filter = JSON.parse(queryStr);
    let query = PersonModel.find(filter);
    if (req.query.sort) query = query.sort(req.query.sort.split(',').join(' '));
    const persons = await query;
    res.status(200).json({ status: "success", data: persons });
});

export const getPerson = catchAsync(async function (req, res, next) {
    const person = await PersonModel.findById(req.params.id);
    if (!person) return next(new AppError('person not found', 404));
    res.status(200).json({ status: "success", data: person });
});

export const updatePerson = catchAsync(async function (req, res, next) {
    const updatedPerson = await PersonModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedPerson) return next(new AppError('person not found', 404));
    res.status(200).json({ status: "success", data: updatedPerson });
});

export const deletePerson = catchAsync(async function (req, res, next) {
    const deletedPerson = await PersonModel.findByIdAndDelete(req.params.id);
    if (!deletedPerson) return next(new AppError('person not found', 404));
    res.status(200).json({ status: "success", data: deletedPerson });
});
