import async from "async";
import crypto from "crypto";
import { Request, Response, NextFunction, response } from "express";
import { IVerifyOptions } from "passport-local";
import passport from "passport";
import { WriteError } from "mongodb";
import { User, UserDocument } from '../models/User';
import "../config/passport";

export const postSignup = (req: Request, res: Response, next: NextFunction) => {
  let user = new User();
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);
  user.save((err) => {
    if (err) { return next(err); }
    return res.json({user: user.toAuthJSON()});
  });
};

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  if(!req.body.user.email) {
    return res.status(422).json({errors: {email: "can't be empty"}});
  }

  if(!req.body.user.password) {
    return res.status(422).json({errors: {password: "can't be empty"}});
  }

  passport.authenticate("local", (err: Error, user: UserDocument, info: IVerifyOptions) => {
    if (err) { return next(err); }
    if (!user) {
        return res.status(422).json(info);
    }
    console.log(user);
    user.token = user.generateJWT();
    return res.json({user: user.toAuthJSON()});
  })(req, res, next);
};