import { model, Schema, Document, PaginateModel } from 'mongoose';
import { User } from '@interfaces/users.interface';
import paginate from 'mongoose-paginate-v2';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(paginate);

const userModel = model<User & Document, PaginateModel<User & Document>>('User', userSchema, 'User');

export default userModel;
