import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import catchAsync from '../middleware/catchAsync.js';
import AppError from '../utils/appError.js';

function signToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

export const signup = catchAsync(async function (req, res, next) {
    const { username, password } = req.body;
    const newUser = await UserModel.create({ username, password });

    const token = signToken(newUser._id);
    res.status(201).json({
        status: "success",
        token
    });
});

export const login = catchAsync(async function (req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new AppError('please provide username and password', 400));
    }

    // password has `select: false` in the schema, so it must be explicitly requested.
    const user = await UserModel.findOne({ username }).select('+password');

    if (!user || !(await user.correctPassword(password))) {
        return next(new AppError('incorrect username or password', 401));
    }

    const token = signToken(user._id);
    res.status(200).json({
        status: "success",
        token
    });
});
