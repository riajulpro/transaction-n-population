import mongoose from "mongoose";
import employeeModel from "../models/employee.model";
import personalDetailsModel from "../models/personalDetails.model";
import { Request, Response } from "express";
import contactModel from "../models/contact.model";
import addressModel from "../models/address.model";

export const createAnEmployee = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const employeeId = req.body.empId;

    // Check if the employee ID already exists
    const existingEmployee = await employeeModel
      .findOne({ empId: employeeId })
      .session(session);
    if (existingEmployee) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Employee ID already exists" });
    }

    // Create the employee
    const employee = new employeeModel({ empId: employeeId as string });
    const savedEmployee = await employee.save({ session });

    // Create empty PersonalDetails, Contact, and Address with empDocId
    const personalDetails = new personalDetailsModel({
      empDocId: savedEmployee._id,
      firstName: "",
      lastName: "",
      dateOfBirth: null,
    });
    const savedPersonalDetails = await personalDetails.save({ session });

    const contact = new contactModel({
      empDocId: savedEmployee._id,
      email: "",
      phone: "",
    });
    const savedContact = await contact.save({ session });

    const address = new addressModel({
      empDocId: savedEmployee._id,
      city: "",
      area: "",
      state: "",
    });
    const savedAddress = await address.save({ session });

    // Update the employee document with the references
    savedEmployee.contact = savedContact._id;
    savedEmployee.address = savedAddress._id;
    savedEmployee.personalDetails = savedPersonalDetails._id;
    await savedEmployee.save({ session });

    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: "Employee successfully created!",
    });
  } catch (err: any) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
};

export const readEmployees = async (req: Request, res: Response) => {
  const { empId: employeeId, empOid } = req.body;
  try {
    const populatedEmployee = await employeeModel
      .find()
      .populate("contact")
      .populate("address")
      .populate("personalDetails")
      .exec();

    res.status(201).json({ employees: populatedEmployee });
  } catch (error) {
    console.log(error);
  }
};

export const readSingleEmployee = async (req: Request, res: Response) => {
  const { id: employeeId } = req.params;
  try {
    const getEmployee = await employeeModel.findOne({ _id: employeeId });
    if (!getEmployee) {
      return res
        .status(400)
        .json({ message: `Invalid ID! Employee not found!` });
    }

    res.status(201).json({
      success: true,
      employee: getEmployee,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAnEmployee = async (req: Request, res: Response) => {
  try {
    // nothing to update here
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const deletedEmployee = await employeeModel.findByIdAndDelete(id);
    await contactModel.deleteMany({ empDocId: id });
    await addressModel.deleteMany({ empDocId: id });
    await personalDetailsModel.deleteMany({ empDocId: id });

    await session.commitTransaction();

    res.status(201).json({
      message: "Employee successfully deleted!",
    });
  } catch (error: any) {
    if (session) {
      await session.abortTransaction();
    }
    console.error("Error deleting employee:", error);
    res.status(400).json({
      message: "Error deleting employee",
      error: error.message,
    });
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
