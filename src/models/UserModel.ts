import mongoose, { Schema } from "mongoose";
// User Table
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },

    rule: {
        type: Number,
        default: 1 // User = 1, Admin = 0
    },
    photoUrl: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})
const UserModel = mongoose.model('users', UserSchema);
export default UserModel;
