import TextAnalyzerHelper from "../../test-helpers/TextAnalyzerHelper";
import paragraphSchema from '../../schemas/paragraph.json';

describe('Text Analyzer API Test', () => {  
  const textAnalyzer = new TextAnalyzerHelper();
  let paragraphId: string;

  beforeEach(async () => {
    // create a paragraph before each test to make sure data exist in database for the tests
    const body = '"The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun."';
    const response = await textAnalyzer.createParagraph({ body });
    paragraphId = response.data._id;
  });

  afterEach(async () => {
    // created test data removed

  });

  describe('POST /paragraphs', () => {
    test('should creare a paragraph', async () => {
      const body = 'The swift red fox leaps over the sleepy cat. The sleepy cat basked in the warm sun.';
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
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.data).toMatchSchema({ type: 'array', items: paragraphSchema });
    });
  });

  describe('GET /paragraphs/:id', () => {
    test('should get a paragraph by id', async () => {
      const response = await textAnalyzer.getParagraph(paragraphId);
      expect(response.status).toEqual(200);
      expect(response.data).toMatchSchema(paragraphSchema);
    });

    test('should get http status 404 when paragraph id invalid and length (24)', () => {
      textAnalyzer.getParagraph("123412341234123412341234").catch(error => {
        expect(error.status).toEqual(404);
        expect(error.response.data.message).toEqual("Sorry! no paragraph found.");
      });
    });

    test('should get http status 500 when paragraph id invalid and length not (24)', () => {
      textAnalyzer.getParagraph("12345").catch(error => {
        expect(error.status).toEqual(500);
        expect(error.response.data.message).toEqual("Oops! failed to get the paragraph.");
      });
    });

    test('GET /words --> should return the number of words in paragraphs', async () => {
      const response = await textAnalyzer.getParagraphWordsCount(paragraphId);
      expect(response.status).toEqual(200);
      expect(response.data.count).toBeGreaterThan(0);
    });

    test('GET /characters --> should return the number of characters in paragraphs', async () => {
      const response = await textAnalyzer.getParagraphCharactersCount(paragraphId);
      expect(response.status).toEqual(200);
      expect(response.data.count).toBeGreaterThan(0);
    });

    test('GET /sentences should --> return the number of sentences in paragraphs', async () => {
      const response = await textAnalyzer.getParagraphSentencesCount(paragraphId);
      expect(response.status).toEqual(200);
      expect(response.data.count).toBeGreaterThan(0);
    });

    test('GET /count --> should return the number of paragraphs', async () => {
      const response = await textAnalyzer.getParagraphCount(paragraphId);
      expect(response.status).toEqual(200);
      expect(response.data.count).toBeGreaterThan(0);
    });

    test('GET /longest-words --> should return the longest words in paragraphs', async () => {
      const response = await textAnalyzer.getParagraphLongestWords(paragraphId);
      expect(response.status).toEqual(200);
      expect(response.data.words.length).toBeGreaterThan(0);
    });
  });

  describe('PATCH /paragraphs/:id', () => {
    test.todo('should update a paragraph by id');
  });

  describe('DELETE /paragraphs/:id', () => {
    test.todo('should delete a paragraph by id');
  });
});