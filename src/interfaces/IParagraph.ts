export interface IParagraph {
  _id: string;
  body: string;
  totalWords?: number;
  totalCharacters?: number;
  totalSentences?: number;
  totalParagraphs?: number;
  longestWords?: string[];
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
