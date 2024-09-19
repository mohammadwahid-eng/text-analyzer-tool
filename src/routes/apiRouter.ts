import { Router } from 'express';
import * as ParagraphController from '../controllers/ParagraphController';

const apiRouter: Router = Router();

apiRouter.post('/paragraphs', ParagraphController.createParagraph);
apiRouter.get('/paragraphs', ParagraphController.getAllParagraphs);

export default apiRouter;