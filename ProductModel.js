import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: [true, 'a product requires a title!'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        minlength: [5, 'minimum length for a description is 5 characters.'],
        maxlength: [1000, 'maximum length for a description is 1000 characters.']
    },
    price: {
        type: Number,
        required: [true, 'price is a required field'],
        min: [0, 'minimum price is 0.'],
        max: [10000, 'maximum price is 10,000.']
    },
    created: Date
});

export default mongoose.model('product', ProductSchema);
