import mongoose, { Document, Schema } from "mongoose";

interface Iuser extends Document {
    name: string,
    place: string,
    phoneNumber: string,
    email: string,
    password: string,
    image: string,
    isBlocked:boolean
}
const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    place: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isBlocked:{type:Boolean,default:false},
    image: { type: String}
});
const userModel = mongoose.model<Iuser>("users", UserSchema);
export default userModel