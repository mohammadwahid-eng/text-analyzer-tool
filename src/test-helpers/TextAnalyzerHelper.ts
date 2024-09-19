import client, { AxiosInstance, AxiosResponse } from "axios";
import { IParagraph } from "../interfaces/IParagraph";

class TextAnalyzerHelper {
  axios: AxiosInstance;
  constructor() {
    this.axios = client.create({
      baseURL: 'http://localhost:3000/api',
      timeout: 30000
    });
  }

  async createParagraph(payload: IParagraph): Promise<AxiosResponse> {
    return this.axios.post('/paragraphs', payload);
  }

  async getAllParagraphs(): Promise<AxiosResponse> {
    return this.axios.get('/paragraphs');
  }
}

export default TextAnalyzerHelper;