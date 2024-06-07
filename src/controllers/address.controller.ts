import { Request, Response } from "express";
import Joi from "joi";
import addressModel from "../models/address.model";

const addressUpdateSchema = Joi.object({
  city: Joi.string().optional(),
  area: Joi.string().optional(),
  state: Joi.string().optional(),
});

export const updateSingleAddress = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const { error, value } = addressUpdateSchema.validate(req.body);

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

    const updatedRes = await addressModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (!updatedRes) {
      res.status(404).json({ message: "Address not found" });
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
