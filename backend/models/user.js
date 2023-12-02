import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    fname: { type: String, required: true },
    mname: { type: String },
    lname: { type: String, required: true },
    type: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: { type: Array },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
