import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import personRoutes from './routes/personRoutes.js';
import authRoutes from './routes/authRoutes.js';
import protect from './middleware/authMiddleware.js';
import globalErrorHandler from './controllers/errorController.js';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const connectionString = process.env.MONGO_URI;

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/products', protect, productRoutes);
app.use('/api/v1/people', protect, personRoutes);

app.use(globalErrorHandler);

mongoose.connect(connectionString);

app.listen(port, function () {
    console.log(`App is running and listening on port ${port}.`);
});
