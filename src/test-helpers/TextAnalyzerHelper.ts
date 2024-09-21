import client, { AxiosInstance } from 'axios';

class TextAnalyzerHelper {
  axios: AxiosInstance;
  constructor() {
    const port = process.env.PORT || 3000;
    this.axios = client.create({
      baseURL: `http://localhost:${port}/api`,
      timeout: 30000,
    });
  }

  setAuthToken(token: string) {
    this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }

  async createParagraph({ body }: { body: string }) {
    return this.axios.post('/paragraphs', { body });
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

  async updateParagraph(paragraphId: string, { body }: { body: string }) {
    return this.axios.patch(`/paragraphs/${paragraphId}`, { body });
  }

  async deleteParagraph(paragraphId: string) {
    return this.axios.delete(`/paragraphs/${paragraphId}`);
  }
}

export default TextAnalyzerHelper;
