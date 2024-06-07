import { Request, Response } from "express";
import Joi from "joi";
import contactModel from "../models/contact.model";

const contactUpdateSchema = Joi.object({
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
});

export const updateSingleContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const { error, value } = contactUpdateSchema.validate(req.body);

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

    const updatedRes = await contactModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (!updatedRes) {
      res.status(404).json({ message: "Contact not found" });
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
