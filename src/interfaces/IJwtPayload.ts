export interface IJwtPayload {
  user: {
    _id: string;
    name: string;
    email: string;
  };
}
