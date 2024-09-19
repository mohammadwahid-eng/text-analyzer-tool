import { Request, Response, Router } from 'express';
import * as ParagraphController from '../controllers/ParagraphController';

const apiRouter: Router = Router();

apiRouter.post('/paragraphs', ParagraphController.createParagraph);;

export default apiRouter;