import TextAnalyzerHelper from '../../test-helpers/TextAnalyzerHelper';
import AuthHelper from '../../test-helpers/AuthHelper';
import paragraphSchema from '../../schemas/paragraph.json';
import { ILoginUser } from '../../interfaces/IUser';

describe('Text Analyzer API Test', () => {
  const textAnalyzer = new TextAnalyzerHelper();
  const authHelper = new AuthHelper();
  let paragraphId: string;
  let token: string;
  const user: ILoginUser = {
    email: `john+${Date.now()}@gmail.com`,
    password: '123456',
  };

  beforeAll(async () => {
    // login user
    await authHelper.register({ name: 'John', ...user });
    const response = await authHelper.login(user);
    token = response.data.token;
  });

  beforeEach(async () => {
    // set auth token
    textAnalyzer.setAuthToken(token);

    // create a paragraph before each test to make sure data exist in database for the tests
    const body =
      '"The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun."';
    const response = await textAnalyzer.createParagraph({ body });
    paragraphId = response.data._id;
  });

  describe('POST /paragraphs --> create paragraph', () => {
    test('should creare a paragraph', async () => {
      const body =
        'The swift red fox leaps over the sleepy cat. The sleepy cat basked in the warm sun.';
      const response = await textAnalyzer.createParagraph({ body });
      expect(response.status).toEqual(201);
      expect(response.data.body).toEqual(body);
      expect(response.data).toMatchSchema(paragraphSchema);

      // for other tests case, a new paragraph is created and deleted automatically.
      // since this test is only for paragraph creation
      // we have to delete it manually to undo the state.
      await textAnalyzer.deleteParagraph(response.data._id);
    });
  });

  describe('GET /paragraphs --> get all paragraphs', () => {
    test('GET / --> should get list of paragraphs', async () => {
      const response = await textAnalyzer.getAllParagraphs();
      expect(response.status).toEqual(200);
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.data).toMatchSchema({
        type: 'array',
        items: paragraphSchema,
      });
    });
  });

  describe('GET /paragraphs/:id --> get single paragraph', () => {
    test('should get a paragraph by id', async () => {
      const response = await textAnalyzer.getParagraph(paragraphId);
      expect(response.status).toEqual(200);
      expect(response.data).toMatchSchema(paragraphSchema);
    });

    test('should not get a paragraph by id of other user', async () => {
      const credentials: ILoginUser = {
        email: `lory+${Date.now()}@gmail.com`,
        password: '123456',
      };
      await authHelper.register({ name: 'Lory', ...credentials });
      const login = await authHelper.login(credentials);
      const token2 = login.data.token;
      textAnalyzer.setAuthToken(token2);
      textAnalyzer.getParagraph(paragraphId).catch((error) => {
        expect(error.status).toEqual(403);
        expect(error.response.data.message).toEqual('Access forbidden');
      });
    });

    test('should get http status 404 when paragraph id invalid and length (24)', () => {
      textAnalyzer.getParagraph('123412341234123412341234').catch((error) => {
        expect(error.status).toEqual(404);
        expect(error.response.data.message).toEqual(
          'Sorry! no paragraph found.'
        );
      });
    });

    test('should get http status 500 when paragraph id invalid and length not (24)', () => {
      textAnalyzer.getParagraph('12345').catch((error) => {
        expect(error.status).toEqual(500);
        expect(error.response.data.message).toEqual(
          'Oops! failed to get the paragraph.'
        );
      });
    });

    test('GET /words --> should return the number of words in paragraphs', async () => {
      const response = await textAnalyzer.getParagraphWordsCount(paragraphId);
      expect(response.status).toEqual(200);
      expect(response.data.count).toBeGreaterThan(0);
    });

    test('GET /characters --> should return the number of characters in paragraphs', async () => {
      const response = await textAnalyzer.getParagraphCharactersCount(
        paragraphId
      );
      expect(response.status).toEqual(200);
      expect(response.data.count).toBeGreaterThan(0);
    });

    test('GET /sentences should --> return the number of sentences in paragraphs', async () => {
      const response = await textAnalyzer.getParagraphSentencesCount(
        paragraphId
      );
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

  describe('PATCH /paragraphs/:id --> update paragraph', () => {
    test('should update a paragraph by id', async () => {
      const body = 'This is updated text.';
      const response = await textAnalyzer.updateParagraph(paragraphId, {
        body,
      });
      expect(response.status).toEqual(200);
      expect(response.data._id).toEqual(paragraphId);
      expect(response.data.body).toEqual(body);
      expect(response.data).toMatchSchema(paragraphSchema);
    });

    test('should not update a paragraph by id of another user', async () => {
      const credentials: ILoginUser = {
        email: `lory+${Date.now()}@gmail.com`,
        password: '123456',
      };
      await authHelper.register({ name: 'Lory', ...credentials });
      const login = await authHelper.login(credentials);
      const token2 = login.data.token;
      textAnalyzer.setAuthToken(token2);
      textAnalyzer
        .updateParagraph(paragraphId, { body: 'New content' })
        .catch((error) => {
          expect(error.status).toEqual(403);
          expect(error.response.data.message).toEqual('Access forbidden');
        });
    });
  });

  describe('DELETE /paragraphs/:id --> delete paragraph', () => {
    test('should delete a paragraph by id', async () => {
      const response = await textAnalyzer.deleteParagraph(paragraphId);
      expect(response.status).toEqual(204);
    });

    test('should not delete a paragraph by id of another user', async () => {
      const credentials: ILoginUser = {
        email: `lory+${Date.now()}@gmail.com`,
        password: '123456',
      };
      await authHelper.register({ name: 'Lory', ...credentials });
      const login = await authHelper.login(credentials);
      const token2 = login.data.token;
      textAnalyzer.setAuthToken(token2);
      textAnalyzer.deleteParagraph(paragraphId).catch((error) => {
        expect(error.status).toEqual(403);
        expect(error.response.data.message).toEqual('Access forbidden');
      });
    });
  });
});
