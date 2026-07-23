import PersonModel from '../models/PersonModel.js';

export async function createPerson(req, res, next) {
    try {
        const newPerson = await PersonModel.create(req.body);
        res.status(201).json({ status: "success", data: newPerson });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: 'error: ' + err });
    }
}

export async function getAllPersons(req, res, next) {
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
    } catch (err) {
        res.status(400).json({ status: "fail", message: "error: " + err });
    }
}

export async function getPerson(req, res, next) {
    try {
        const person = await PersonModel.findById(req.params.id);
        if (!person) return res.status(404).json({ status: "fail", message: "person not found" });
        res.status(200).json({ status: "success", data: person });
    } catch (err) {
        res.status(400).json({ status: "fail", message: "error: " + err });
    }
}

export async function updatePerson(req, res, next) {
    try {
        const updatedPerson = await PersonModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedPerson) return res.status(404).json({ status: "fail", message: "person not found" });
        res.status(200).json({ status: "success", data: updatedPerson });
    } catch (err) {
        res.status(400).json({ status: "fail", message: "error: " + err });
    }
}

export async function deletePerson(req, res, next) {
    try {
        const deletedPerson = await PersonModel.findByIdAndDelete(req.params.id);
        if (!deletedPerson) return res.status(404).json({ status: "fail", message: "person not found" });
        res.status(200).json({ status: "success", data: deletedPerson });
    } catch (err) {
        res.status(400).json({ status: "fail", message: "error: " + err });
    }
}
