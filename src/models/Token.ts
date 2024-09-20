import { Schema, model } from 'mongoose';
import { IToken } from '../interfaces/IToken';

const tokenSchema = new Schema<IToken>({
  token: { type: String, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

const Token = model('Token', tokenSchema);

export default Token;