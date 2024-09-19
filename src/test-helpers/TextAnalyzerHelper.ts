import client, { AxiosInstance } from "axios";
import { IParagraph } from "../interfaces/IParagraph";

class TextAnalyzerHelper {
  axios: AxiosInstance;
  constructor() {
    this.axios = client.create({
      baseURL: 'http://localhost:3000/api',
      timeout: 30000,
    });
  }

  async createParagraph(payload: IParagraph) {
    return this.axios.post('/paragraphs', payload);
  }

  async getAllParagraphs() {
    return this.axios.get('/paragraphs');
  }

  async getParagraph(paragraphId: string) {
    return this.axios.get(`/paragraphs/${paragraphId}`);
  }

  async getParagraphWordsCount(paragraphId: string) {
    return this.axios.get(`/paragraphs/${paragraphId}/words`);
  }

  async getParagraphCharactersCount(paragraphId: string) {
    return this.axios.get(`/paragraphs/${paragraphId}/characters`);
  }

  async getParagraphSentencesCount(paragraphId: string) {
    return this.axios.get(`/paragraphs/${paragraphId}/sentences`);
  }

  async getParagraphCount(paragraphId: string) {
    return this.axios.get(`/paragraphs/${paragraphId}/count`);
  }

  async getParagraphLongestWords(paragraphId: string) {
    return this.axios.get(`/paragraphs/${paragraphId}/longest-words`);
  }

  async updateParagraph(paragraphId: string, payload: IParagraph) {
    return this.axios.patch(`/paragraphs/${paragraphId}`, payload);
  }

  async deleteParagraph(paragraphId: string) {
    return this.axios.delete(`/paragraphs/${paragraphId}`);
  }
}

export default TextAnalyzerHelper;