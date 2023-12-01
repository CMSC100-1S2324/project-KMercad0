import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    fname: { type: String, required: true },
    mname: { type: String },
    lname: { type: String, required: true },
    usertype: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export default User = mongoose.model("User", UserSchema);
