import { Router } from 'express';
import * as ParagraphController from '../controllers/ParagraphController';
import * as AuthController from '../controllers/AuthController';
import authMiddleware from '../middlewares/authMiddleware';

const apiRouter: Router = Router();

// paragraph routes
apiRouter.post('/paragraphs', authMiddleware, ParagraphController.createParagraph);
apiRouter.get('/paragraphs', authMiddleware, ParagraphController.getMyParagraphs);
apiRouter.get('/paragraphs/:id', authMiddleware, ParagraphController.getParagraph);
apiRouter.patch('/paragraphs/:id', authMiddleware, ParagraphController.updateParagraph);
apiRouter.delete('/paragraphs/:id', authMiddleware, ParagraphController.deleteParagraph);
apiRouter.get('/paragraphs/:id/words', authMiddleware, ParagraphController.getParagraphProperty);
apiRouter.get('/paragraphs/:id/characters', authMiddleware, ParagraphController.getParagraphProperty);
apiRouter.get('/paragraphs/:id/sentences', authMiddleware, ParagraphController.getParagraphProperty);
apiRouter.get('/paragraphs/:id/count', authMiddleware, ParagraphController.getParagraphProperty);
apiRouter.get('/paragraphs/:id/longest-words', authMiddleware, ParagraphController.getParagraphProperty);
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


// auth routes
apiRouter.post('/auth/register', AuthController.register);
apiRouter.post('/auth/login', AuthController.login);

export default apiRouter;