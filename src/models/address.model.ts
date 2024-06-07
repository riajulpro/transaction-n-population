import mongoose from "mongoose";

interface IAddress extends Document {
  empDocId: mongoose.Types.ObjectId;
  city: string;
  area: string;
  state: string;
}

const addressSchema = new mongoose.Schema({
  empDocId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  city: String,
  area: String,
  state: String,
});

export default mongoose.model<IAddress>("Address", addressSchema);
