import mongoose, { Document, Schema } from "mongoose";

interface IEmployee extends Document {
  empId: string;
  contact: mongoose.Types.ObjectId;
  address: mongoose.Types.ObjectId;
  personalDetails: mongoose.Types.ObjectId;
}

const employeeSchema: Schema = new Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  personalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonalDetails",
  },
});

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);
export default Employee;
