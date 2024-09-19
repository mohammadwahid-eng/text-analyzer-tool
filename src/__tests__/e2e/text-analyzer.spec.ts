describe('Text Analyzer API Test', () => {
  describe('POST /paragraphs', () => {
    test.todo('should creare a paragraph');
  });

  describe('GET /paragraphs', () => {
    test.todo('GET / --> should get list of paragraphs');
    test.todo('GET /words --> should return the number of words in paragraphs');
    test.todo('GET /characters --> should return the number of characters in paragraphs');
    test.todo('GET /sentences should --> return the number of sentences in paragraphs');
    test.todo('GET /count --> should return the number of paragraphs');
    test.todo('GET /longest-words --> should return the longest words in paragraphs');
  });

  describe('GET /paragraphs/:id', () => {
    test.todo('should get a paragraph by id');
    test.todo('should return error with invalid paragraph id');
  });

  describe('PATCH /paragraphs/:id', () => {
    test.todo('should update a paragraph by id');
  });

  describe('DELETE /paragraphs/:id', () => {
    test.todo('should delete a paragraph by id');
  });
});