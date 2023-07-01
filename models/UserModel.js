import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId: String,
    githubId: String,
    name: String,
    email: String,
    picture: String
})

const UserModel = mongoose.model('User', userSchema, 'users');

export default UserModel