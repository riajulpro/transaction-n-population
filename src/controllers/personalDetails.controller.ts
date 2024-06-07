import { Request, Response } from "express";
import Joi from "joi";
import personalDetailsModel from "../models/personalDetails.model";

const personalUpdateSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  dateOfBirth: Joi.date().optional(),
});

export const updateSinglePersonalDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const { error, value } = personalUpdateSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  try {
    const filter = { empDocId: id };
    const update = {
      $set: {
        ...value,
      },
    };
    const options = {
      new: true,
      upsert: false,
    };

    const updatedRes = await personalDetailsModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (!updatedRes) {
      res.status(404).json({ message: "Personal Details not found" });
      return;
    }

    res.status(200).json({
      message: "Database successfully updated!",
      res: updatedRes,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
