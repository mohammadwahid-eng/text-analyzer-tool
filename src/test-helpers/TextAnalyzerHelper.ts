import client, { AxiosInstance } from "axios";
import { IParagraph } from "../interfaces/IParagraph";

class TextAnalyzerHelper {
  axios: AxiosInstance;
  constructor() {
    this.axios = client.create({
      baseURL: 'http://localhost:3000/api',
      timeout: 30000
    });
  }

  async createParagraph(payload: IParagraph) {
    return this.axios.post('/paragraphs', payload);
  }
}

export default TextAnalyzerHelper;