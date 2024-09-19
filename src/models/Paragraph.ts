import { Schema, model } from 'mongoose';
import { IParagraph } from '../interfaces/IParagraph';

const paragraphSchema = new Schema<IParagraph>({
  body: { type: String, trim: true, required: true },
  totalWords: { type: Number, default: 0 },
  totalCharacters: { type: Number, default: 0 },
  totalSentences: { type: Number, default: 0 },
  totalParagraphs: { type: Number, default: 0 },
  longestWords: [String]
}, { timestamps: true });

paragraphSchema.pre('save', function(next) {
  // ignore punctuation
  // count total words
  // count total characters
  // count total sentences
  // count total paragraphs
  // set longest words
  next();
});

const Paragraph = model<IParagraph>('Paragraph', paragraphSchema);

export default Paragraph;