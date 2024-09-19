import { Request, Response } from "express";
import Joi from 'joi';
import Paragraph from "../models/Paragraph";

export const createParagraph = async (req: Request, res: Response) => {
  const { error } = Joi.object({
    body: Joi.string().trim().required()
  }).validate(req.body);

  if( error ) return res.status(422).json({ message: error.details[0].message });
  
  try {
    const { body } = req.body;
    const paragraph = new Paragraph({ body });
    await paragraph.save();
    return res.status(201).json(paragraph);
  } catch(error) {
    return res.status(500).json({ message: 'Oops! failed to create paragraph.' });
  }
}

export const getAllParagraphs = async (req: Request, res: Response) => {
  try {
    const paragraphs = await Paragraph.find();
    return res.status(200).json(paragraphs);
  } catch(error) {
    return res.status(500).json({ message: 'Oops! failed to get paragraphs.' });
  }
}