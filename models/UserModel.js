import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'a user requires a username'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'a user requires a password'],
        minlength: [8, 'password must be at least 8 characters'],
        select: false
    }
});

// Hash the password before saving, only if it was modified (created or changed).
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Instance method to check a plaintext password against the stored hash.
UserSchema.methods.correctPassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
