import mongoose, { Schema } from 'mongoose';
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
    },
    password: {
        type: String,
        required: [false, 'Please provide password'],
        minlength: 4,
    },
})

UserSchema.pre('save', async function (this: any) {
    if (this.passport) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
})

UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}

const User = mongoose.model('User', UserSchema);

const FederatedCredential = mongoose.model('FederatedCredential', new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    provider: String,
    subject: String,
}));

module.exports = { User, FederatedCredential }
