import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import catchAsync from './catchAsync.js';
import AppError from '../utils/appError.js';

// Verifies the "Authorization: Bearer <token>" header and attaches the
// authenticated user to req.user. Blocks the request with 401 otherwise.
const protect = catchAsync(async function (req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('you are not logged in. please log in to get access', 401));
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return next(new AppError('invalid or expired token', 401));
    }

    const currentUser = await UserModel.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('the user belonging to this token no longer exists', 401));
    }

    req.user = currentUser;
    next();
});

export default protect;
