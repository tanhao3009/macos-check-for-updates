import { Request, Response } from "express";
export let getUsages = (req: Request, res: Response) => {
  res.send(`
    <h1>Usages</h1>
    <p>Please refer to <a href="https://github.com/hungtq287/macos-check-for-updates/tree/master/Backend" target="blank">my tutorial</a> for details.</p>
    <ul>
      <li>GET /files   - list all upload files</li>
      <li>GET /files/{id} - get one uploaded file</li>
      <li>POST /upload/file - handle single file upload</li>
      <li>POST /upload/files - handle multiple files upload</li>
    </ul>
  `);
};