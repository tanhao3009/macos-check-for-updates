import { Request, Response } from "express";
export let getUsages = (req: Request, res: Response) => {
  res.render("home", {
    title: "Home"
  });
};