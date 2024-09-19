import { Router } from 'express';
import * as ParagraphController from '../controllers/ParagraphController';

const apiRouter: Router = Router();

apiRouter.post('/paragraphs', ParagraphController.createParagraph);
apiRouter.get('/paragraphs', ParagraphController.getAllParagraphs);
apiRouter.get('/paragraphs/:id', ParagraphController.getParagraph);
apiRouter.patch('/paragraphs/:id', ParagraphController.updateParagraph);
apiRouter.delete('/paragraphs/:id', ParagraphController.deleteParagraph);

/**
 * We should not use individual method for getting each propery of a paragraph.
 * Since only response will be different, I am using single method for getting individuall data of a paragraph.
 * If future, if any more response needed with a single route, we can use from below and customise as per requirement.
*/
// apiRouter.get('/paragraphs/:id/words', ParagraphController.getParagraphWordsCount);
// apiRouter.get('/paragraphs/:id/characters', ParagraphController.getParagraphCharactersCount);
// apiRouter.get('/paragraphs/:id/sentences', ParagraphController.getParagraphSentencesCount);
// apiRouter.get('/paragraphs/:id/count', ParagraphController.getParagraphCount);
// apiRouter.get('/paragraphs/:id/longest-words', ParagraphController.getParagraphLongestWords);

apiRouter.get('/paragraphs/:id/words', ParagraphController.getParagraphProperty);
apiRouter.get('/paragraphs/:id/characters', ParagraphController.getParagraphProperty);
apiRouter.get('/paragraphs/:id/sentences', ParagraphController.getParagraphProperty);
apiRouter.get('/paragraphs/:id/count', ParagraphController.getParagraphProperty);
apiRouter.get('/paragraphs/:id/longest-words', ParagraphController.getParagraphProperty);

export default apiRouter;