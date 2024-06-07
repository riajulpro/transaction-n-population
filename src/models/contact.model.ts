import mongoose from "mongoose";

interface IContact extends Document {
  empDocId: mongoose.Types.ObjectId;
  email: string;
  phone: string;
}

const contactSchema = new mongoose.Schema({
  empDocId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  email: String,
  phone: String,
});

export default mongoose.model<IContact>("Contact", contactSchema);
