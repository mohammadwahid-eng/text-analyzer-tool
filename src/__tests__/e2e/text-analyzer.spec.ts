import TextAnalyzerHelper from "../../test-helpers/TextAnalyzerHelper";
import paragraphSchema from '../../schemas/paragraph.json';

describe('Text Analyzer API Test', () => {  
  const textAnalyzer = new TextAnalyzerHelper();
  
  describe('POST /paragraphs', () => {
    test('should creare a paragraph', async () => {
      const body = '"The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun."';
      const response = await textAnalyzer.createParagraph({ body });
      expect(response.status).toEqual(201);
      expect(response.data.body).toEqual(body);
      expect(response.data).toMatchSchema(paragraphSchema);
    });
  });

  describe('GET /paragraphs', () => {
    test('GET / --> should get list of paragraphs', async () => {
      const response = await textAnalyzer.getAllParagraphs();
      expect(response.status).toEqual(200);
      expect(response.data).toMatchSchema({ type: 'array', items: paragraphSchema })
    });
  });

  describe('GET /paragraphs/:id', () => {
    test.todo('should get a paragraph by id');
    test.todo('should return error with invalid paragraph id');
    test.todo('GET /words --> should return the number of words in paragraphs');
    test.todo('GET /characters --> should return the number of characters in paragraphs');
    test.todo('GET /sentences should --> return the number of sentences in paragraphs');
    test.todo('GET /count --> should return the number of paragraphs');
    test.todo('GET /longest-words --> should return the longest words in paragraphs');
  });

  describe('PATCH /paragraphs/:id', () => {
    test.todo('should update a paragraph by id');
  });

  describe('DELETE /paragraphs/:id', () => {
    test.todo('should delete a paragraph by id');
  });
});