import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import personRoutes from './routes/personRoutes.js';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const connectionString = process.env.MONGO_URI;

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/people', personRoutes);

mongoose.connect(connectionString);

app.listen(port, function () {
    console.log(`App is running and listening on port ${port}.`);
});
