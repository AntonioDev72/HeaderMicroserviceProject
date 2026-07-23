import 'dotenv/config';
import express from 'express';
const app = express();
app.use(express.json());
import CurrentProduct from './ProductModel.js';
import PersonModel from './PersonModel.js';
import mongoose from 'mongoose';
const port = process.env.PORT || 3000;
const connectionString = process.env.MONGO_URI;

app.post('/api/v1/products', async function(req, res, next) {
    try {
        const product = req.body;
        const newItem = await CurrentProduct.create(product);
        res.status(201).json({ status: "success", data: newItem });
    } catch(err) {
        res.status(400).json({ status: "fail", message: "error: " + err });
    }
});

app.get('/api/v1/products', (req, res, next) => {
    CurrentProduct.find({}).then(data => {
        res.status(200).json({ status: "success", data: data });
    }).catch(err => {
        res.status(404).json({ status: "fail", message: "error: " + err });
    });
});

app.get('/api/v1/products/:id', async function(req, res, next) {
    try {
        const product = await CurrentProduct.findById(req.params.id);
        if (!product) return res.status(404).json({ status: "fail", message: "product not found" });
        res.status(200).json({ status: "success", data: product });
    } catch(err) {
        res.status(400).json({ status: "fail", message: "error: " + err });
    }
});

app.patch('/api/v1/products/:id', async function(req, res, next) {
    try {
        const updatedProduct = await CurrentProduct.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) return res.status(404).json({ status: "fail", message: "product not found" });
        res.status(200).json({ status: "success", data: updatedProduct });
    } catch(err) {
        res.status(400).json({ status: "fail", message: "error: " + err });
    }
});

app.delete('/api/v1/products/:id', async function(req, res, next) {
    try {
        const deletedProduct = await CurrentProduct.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ status: "fail", message: "product not found" });
        res.status(200).json({ status: "success", data: deletedProduct });
    } catch(err) {
        res.status(400).json({ status: "fail", message: "error: " + err });
    }
});

app.post('/api/v1/people', async function(req, res, next) {
    try {
      const newPerson = await PersonModel.create(req.body);
      res.status(201).json({ status: "success", data: newPerson });
    } catch(err) {
        res.status(400).json({ status: 'fail', message: 'error: ' + err });
    }
});

app.get('/api/v1/people', async function(req, res, next) {
    try {
        const queryObj = { ...req.query };
        delete queryObj.sort;
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        const filter = JSON.parse(queryStr);
        let query = PersonModel.find(filter);
        if (req.query.sort) query = query.sort(req.query.sort.split(',').join(' '));
        const persons = await query;
        res.status(200).json({ status: "success", data: persons });
    } catch(err) {
        res.status(400).json({ status: "fail", message: "error: " + err });
    }
});

app.get('/api/v1/people/:id', async function(req, res, next) {
    try {
        const person = await PersonModel.findById(req.params.id);
        if (!person) return res.status(404).json({ status: "fail", message: "person not found" });
        res.status(200).json({ status: "success", data: person });
    } catch(err) {
        res.status(400).json({ status: "fail", message: "error: " + err });
    }
});

app.patch('/api/v1/people/:id', async function(req, res, next) {
    try {
        const updatedPerson = await PersonModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedPerson) return res.status(404).json({ status: "fail", message: "person not found" });
        res.status(200).json({ status: "success", data: updatedPerson });
    } catch(err) {
        res.status(400).json({ status: "fail", message: "error: " + err });
    }
});

app.delete('/api/v1/people/:id', async function(req, res, next) {
    try {
        const deletedPerson = await PersonModel.findByIdAndDelete(req.params.id);
        if (!deletedPerson) return res.status(404).json({ status: "fail", message: "person not found" });
        res.status(200).json({ status: "success", data: deletedPerson });
    } catch(err) {
        res.status(400).json({ status: "fail", message: "error: " + err });
    }
});

mongoose.connect(connectionString);

app.listen(port, function() {
    console.log(`App is running and listening on port ${port}.`)
});
