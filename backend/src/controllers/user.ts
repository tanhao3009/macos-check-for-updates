import { Request, Response, NextFunction, response } from "express";
import { User } from '../models/User';

export const postSignup = (req: Request, res: Response, next: NextFunction) => {
  let user = new User();
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);
  user.save((err) => {
    if (err) { return next(err); }
    return res.json({user: user.toAuthJSON()});
  });
};