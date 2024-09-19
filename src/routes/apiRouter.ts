import { Request, Response, Router } from 'express';

const apiRouter: Router = Router();

apiRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: "Response from text-analyzer-tool:api" });
});

export default apiRouter;