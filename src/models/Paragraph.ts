import { Schema, model } from 'mongoose';
import { IParagraph } from '../interfaces/IParagraph';

const paragraphSchema = new Schema<IParagraph>({
  body: { type: String, trim: true, required: true },
  totalWords: { type: Number, default: 0 },
  totalCharacters: { type: Number, default: 0 },
  totalSentences: { type: Number, default: 0 },
  totalParagraphs: { type: Number, default: 0 },
  longestWords: { type: [String], default: [] },
}, { timestamps: true });

paragraphSchema.pre('save', function(next) {
  // ignore punctuation
  const content = this.body.replace(/[,.\/?:\\;"_'{}[\]()—*&^%$#@!~`]/g, ''); // Punctuation: ,./?:\;"_'{}[]()—*&^%$#@!~`
  
  // count total words
  this.totalWords = content.split(/\s+/).filter(word => word !== '').length;
  
  // count total characters
  this.totalCharacters = content.length;

  // count total sentences
  const contentFilter = this.body.replace(/[,\/:\\;"_'{}[\]()—*&^%$#@~`]/g, ''); // Punctuation removed except .!?
  this.totalSentences = contentFilter.split(/[.?!]+/).filter(sentence => sentence !== '').length;
  
  // count total paragraphs
  this.totalParagraphs = content.split(/\n+/).filter(paragraph => paragraph !== '').length;
  
  // set longest words
  const getWords     = content.split(/\s+/);
  const lengths      = getWords.map(word => word.length);
  const maxLength    = Math.max(...lengths);
  const longestWords = getWords.filter(item => item.length === maxLength);
  this.longestWords  = this.longestWords ? this.longestWords.concat(longestWords) : [];
  
  next();
});

const Paragraph = model<IParagraph>('Paragraph', paragraphSchema);

export default Paragraph;