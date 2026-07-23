import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'a person must have a first name']
    },
    familyName: String,
    city: String,
    country: String,
    salary: Number
});

const PersonModel = mongoose.model('Person', PersonSchema);
export default PersonModel;
