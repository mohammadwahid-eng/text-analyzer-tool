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

export const getParagraph = async (req: Request, res: Response) => {
  try {
    const { id: paragraphId } = req.params;

    const paragraph = await Paragraph.findById(paragraphId);
    if( ! paragraph ) return res.status(404).json({ message: 'Sorry! no paragraph found.' });

    return res.status(200).json(paragraph);
  } catch(error) {
    return res.status(500).json({ message: 'Oops! failed to get the paragraph.' });
  }
}

/**
 * We should not use individual method for getting each propery of a paragraph.
 * Since only response will be different, I am using single method for getting individuall data of a paragraph.
 * If future, if any more response needed with a single route, we can use from below and customise as per requirement.
 */

// export const getParagraphWordsCount = async (req: Request, res: Response) => {
//   try {
//     const { id: paragraphId } = req.params;

//     const paragraph = await Paragraph.findById(paragraphId);
//     if( ! paragraph ) return res.status(404).json({ message: 'Sorry! no paragraph found.' });

//     return res.status(200).json({ count: paragraph.totalWords });
//   } catch(error) {
//     return res.status(500).json({ message: 'Oops! failed to get the paragraph.' });
//   }
// }

// export const getParagraphCharactersCount = async (req: Request, res: Response) => {
//   try {
//     const { id: paragraphId } = req.params;

//     const paragraph = await Paragraph.findById(paragraphId);
//     if( ! paragraph ) return res.status(404).json({ message: 'Sorry! no paragraph found.' });

//     return res.status(200).json({ count: paragraph.totalCharacters });
//   } catch(error) {
//     return res.status(500).json({ message: 'Oops! failed to get the paragraph.' });
//   }
// }

// export const getParagraphSentencesCount = async (req: Request, res: Response) => {
//   try {
//     const { id: paragraphId } = req.params;

//     const paragraph = await Paragraph.findById(paragraphId);
//     if( ! paragraph ) return res.status(404).json({ message: 'Sorry! no paragraph found.' });

//     return res.status(200).json({ count: paragraph.totalSentences });
//   } catch(error) {
//     return res.status(500).json({ message: 'Oops! failed to get the paragraph.' });
//   }
// }

// export const getParagraphCount = async (req: Request, res: Response) => {
//   try {
//     const { id: paragraphId } = req.params;

//     const paragraph = await Paragraph.findById(paragraphId);
//     if( ! paragraph ) return res.status(404).json({ message: 'Sorry! no paragraph found.' });

//     return res.status(200).json({ count: paragraph.totalParagraphs });
//   } catch(error) {
//     return res.status(500).json({ message: 'Oops! failed to get the paragraph.' });
//   }
// }

// export const getParagraphLongestWords = async (req: Request, res: Response) => {
//   try {
//     const { id: paragraphId } = req.params;

//     const paragraph = await Paragraph.findById(paragraphId);
//     if( ! paragraph ) return res.status(404).json({ message: 'Sorry! no paragraph found.' });

//     return res.status(200).json({ words: paragraph.longestWords });
//   } catch(error) {
//     return res.status(500).json({ message: 'Oops! failed to get the paragraph.' });
//   }
// }

export const getParagraphProperty = async (req: Request, res: Response) => {
  try {
    const { id: paragraphId } = req.params;

    const paragraph = await Paragraph.findById(paragraphId);
    if( ! paragraph ) return res.status(404).json({ message: 'Sorry! no paragraph found.' });

    switch(req.route.path) {
      case '/paragraphs/:id/words':
        return res.status(200).json({ count: paragraph.totalWords });
      
      case '/paragraphs/:id/characters':
        return res.status(200).json({ count: paragraph.totalCharacters });
      
      case '/paragraphs/:id/sentences':
        return res.status(200).json({ count: paragraph.totalSentences });
      
      case '/paragraphs/:id/count':
        return res.status(200).json({ count: paragraph.totalParagraphs });
      
      case '/paragraphs/:id/longest-words':
        return res.status(200).json({ words: paragraph.longestWords }); 
    }
  } catch(error) {
    return res.status(500).json({ message: 'Oops! failed to get the paragraph.' });
  }
}

export const updateParagraph = async (req: Request, res: Response) => {
  const { error } = Joi.object({
    body: Joi.string().trim().required()
  }).validate(req.body);

  if( error ) return res.status(422).json({ message: error.details[0].message });
  
  try {
    const { id: paragraphId } = req.params;
    const { body } = req.body;

    const paragraph = await Paragraph.findByIdAndUpdate(paragraphId, { body }, { new: true });
    if( ! paragraph ) return res.status(404).json({ message: 'Sorry! no paragraph found.' });

    return res.status(200).json(paragraph);
  } catch(error) {
    return res.status(500).json({ message: 'Oops! failed to update paragraph.' });
  }
}