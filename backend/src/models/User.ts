import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';
import crypto from 'crypto';
import { SESSION_SECRET } from '../utils/secrets';

export type UserDocument = mongoose.Document & {
  email: string;
  role: number; // 0: admin, 1: leader, 2: tester
  token: any;
  hash: string;
  salt: string;
  validPassword: validPasswordFunction;
  setPassword: (password) => {};
  toAuthJSON: () => {};
  generateJWT: () => {};
};

type validPasswordFunction = (password: string) => boolean;

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  hash: String,
  salt: String
}, { timestamps: true });

userSchema.plugin(uniqueValidator, {message: 'is already taken.'});

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this.id,
    email: this.email,
    exp: exp.getTime()/1000,
  }, SESSION_SECRET);
};

userSchema.methods.toAuthJSON = function(){
  return {
    email: this.email,
    token: this.generateJWT()
  };
};

export const User = mongoose.model<UserDocument>("User", userSchema);