import { IUser } from "./IUser";

export interface IToken {
  _id: string,
  token: string,
  user: IUser,
  expiresAt: Date,
}