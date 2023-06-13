import mongoose, { Schema } from "mongoose";
export interface users {
    name: string,
    password: string,
}
const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
}, { versionKey: false });

export default mongoose.model<users>('users', userSchema);