import { Request, Response, Router } from 'express';

const webRouter: Router = Router();

webRouter.get('/', (req: Request, res: Response) => {
  res.status(200).send("Response from text-analyzer-tool:web");
});

export default webRouter;