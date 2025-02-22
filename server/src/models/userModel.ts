import mongoose, { Document, Schema } from "mongoose";

interface Iuser extends Document {
    name: string,
    place: string,
    phonNumber: number,
    email: string,
    password: string,
    image:string
}
const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    place: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String}
});
const userModel = mongoose.model<Iuser>("users", UserSchema);
export default userModel