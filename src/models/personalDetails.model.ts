import mongoose from "mongoose";

interface IPersonalDetails extends Document {
  empDocId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
}

const personalDetailsSchema = new mongoose.Schema({
  empDocId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
});

export default mongoose.model<IPersonalDetails>(
  "PersonalDetails",
  personalDetailsSchema
);
