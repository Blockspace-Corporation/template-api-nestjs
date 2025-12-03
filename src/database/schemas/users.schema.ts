import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  role: String,
});