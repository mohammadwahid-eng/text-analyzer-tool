import { PreMiddlewareFunction, PreSaveMiddlewareFunction, Schema, model } from 'mongoose';
import { IParagraph } from '../interfaces/IParagraph';

const paragraphSchema = new Schema<IParagraph>({
  body: { type: String, trim: true, required: true },
  totalWords: { type: Number, default: 0 },
  totalCharacters: { type: Number, default: 0 },
  totalSentences: { type: Number, default: 0 },
  totalParagraphs: { type: Number, default: 0 },
  longestWords: { type: [String], default: [] },
}, { timestamps: true });

const calculation = (body: string) => {
  // ignore punctuation
  const content = body.replace(/[,.\/?:\\;"_'{}[\]()—*&^%$#@!~`]/g, ''); // Punctuation: ,./?:\;"_'{}[]()—*&^%$#@!~`
  
  // count total words
  const totalWords = content.split(/\s+/).filter(word => word !== '').length;
  
  // count total characters
  const totalCharacters = content.length;

  // count total sentences
  const contentFilter = body.replace(/[,\/:\\;"_'{}[\]()—*&^%$#@~`]/g, ''); // Punctuation removed except .!?
  const totalSentences = contentFilter.split(/[.?!]+/).filter(sentence => sentence !== '').length;
  
  // count total paragraphs
  const totalParagraphs = content.split(/\n+/).filter(paragraph => paragraph !== '').length;
  
  // set longest words
  const getWords     = content.split(/\s+/);
  const lengths      = getWords.map(word => word.length);
  const maxLength    = Math.max(...lengths);
  const longestWords = getWords.filter(item => item.length === maxLength);

  return {
    totalWords,
    totalCharacters,
    totalSentences,
    totalParagraphs,
    longestWords,
  }
}

const handlePreSave: PreSaveMiddlewareFunction = function(next) {
  const {
    totalWords,
    totalCharacters,
    totalSentences,
    totalParagraphs,
    longestWords,
  } = calculation(this.body);
  
  this.totalWords = totalWords;
  this.totalCharacters = totalCharacters;
  this.totalSentences = totalSentences;
  this.totalParagraphs = totalParagraphs;
  this.longestWords  = this.longestWords ? this.longestWords.concat(longestWords) : [];
  next();
}

const handlePreUpdate: PreMiddlewareFunction = function(next) {
  const update: IParagraph = this.getUpdate();
  const {
    totalWords,
    totalCharacters,
    totalSentences,
    totalParagraphs,
    longestWords,
  } = calculation(update.body);
  update.totalWords      = totalWords;
  update.totalCharacters = totalCharacters;
  update.totalSentences  = totalSentences;
  update.totalParagraphs = totalParagraphs;
  update.longestWords    = longestWords;
  next();
}

paragraphSchema.pre('save', handlePreSave);
paragraphSchema.pre('findOneAndUpdate', handlePreUpdate);
paragraphSchema.pre('updateOne', handlePreUpdate);
paragraphSchema.pre('updateMany', handlePreUpdate);

const Paragraph = model<IParagraph>('Paragraph', paragraphSchema);

export default Paragraph;