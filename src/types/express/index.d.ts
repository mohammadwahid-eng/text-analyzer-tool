import { IAuthUser } from '../../interfaces/IUser';

declare global {
  namespace Express {
    interface Request {
      user?: IAuthUser;
    }
  }
}
