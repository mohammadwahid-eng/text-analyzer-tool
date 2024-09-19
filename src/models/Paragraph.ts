import { Schema, model } from 'mongoose';
import { IParagraph } from '../interfaces/IParagraph';

const paragraphSchema = new Schema<IParagraph>({
  body: { type: String, trim: true, required: true },
  totalCharacters: Number,
  totalSentences: Number,
  totalParagraphs: Number,
  longestWords: [String]
}, { timestamps: true });

const Paragraph = model<IParagraph>('Paragraph', paragraphSchema);

export default Paragraph;