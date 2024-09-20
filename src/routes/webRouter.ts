import { Request, Response, Router } from 'express';
import * as ParagraphController from '../controllers/ParagraphController';

const webRouter: Router = Router();

webRouter.get('/', async (req: Request, res: Response) => {
  const paragraphs = await ParagraphController.getAllParagraphs(req, res);
  res.render('index', {paragraphs});
});

export default webRouter;