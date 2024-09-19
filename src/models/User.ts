import bcrypt from 'bcryptjs';
import { PreSaveMiddlewareFunction, Schema, model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema = new Schema<IUser>({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, unique: true, required: true },
  password: { type: String, required: true },
  paragraphs: [{ type: Schema.Types.ObjectId, ref: 'Paragraph' }],
}, { timestamps: true });

const handlePreSave: PreSaveMiddlewareFunction = async function(next) {
  if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
}

userSchema.pre('save', handlePreSave);

const User = model<IUser>('User', userSchema);

export default User;