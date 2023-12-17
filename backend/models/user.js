import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    fname: { type: String, required: true },
    mname: { type: String },
    lname: { type: String, required: true },
    type: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
});

UserSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) {
            return next(saltError);
        }

        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if (hashError) {
                return next(hashError);
            }

            user.password = hash;
            return next();
        });
    });
});

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, callback);
};

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
