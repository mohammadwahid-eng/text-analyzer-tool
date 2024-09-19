export interface IParagraph {
  body: string,
  totalCharacters?: number,
  totalSentences?: number,
  totalParagraphs: number,
  longestWords?: string[]
}