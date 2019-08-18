import multer = require('multer');
import { Request, Response, NextFunction } from 'express'
import { fileFilter, loadCollection, cleanFolder } from '../utils/utils';
//import { File } from '../models/File'

import * as path from 'path'
import * as fs from 'fs'

import { File, FileDocument } from '../models/File';

// FileServices
// import * as fileService from '../services/FileService'

const UPLOAD_PATH = 'tmp/uploads/';

// Multer config
const upload = multer({
  dest: UPLOAD_PATH,
  fileFilter: fileFilter
});

const diskStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, UPLOAD_PATH);
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  }
});

const diskUpload = multer({ storage: diskStorage });
const memoryStorage = multer.memoryStorage();
const memoryUpload = multer({ storage: memoryStorage });

/**
 * Multer Instances
 */
export let uploadSingleFile = upload.single('file');
export let uploadMultiFiles = upload.array('files', 12);

/**
 * POST
 */
 export let uploadFile = (req: Request, res: Response, next: NextFunction) => {
  let fileUploaded = req.file;
  let file = new File();
  file.fileName = fileUploaded.filename;
  file.originalname = fileUploaded.originalname;
  file.mimetype = fileUploaded.mimetype;
  file.save((err) => {
    if (err) { return next(err); }
    console.log(file);
    return res.json({file: file.toJSON()});
  });

};

export let uploadFiles = (req: Request, res: Response, next: NextFunction) => {
  res.send("Sorry, Currently this function not yet supported!");
};

/**
 * GET
 */

export let getFile = async (req, res) => {
  res.send('__get File');
  // try {
  //   if(req.params.id === null) {
  //     res.sendStatus(404);
  //     return;
  //   }

  //   let document: File = fileService.getFileForId(req.params.id);
  //   if (!document) {
  //     res.sendStatus(404);
  //     return;
  //   }

  //   res.setHeader('Content-Type', document.mimetype);
  //   fs.createReadStream(path.join(UPLOAD_PATH, document.id)).pipe(res);
  // } catch {
  //   res.send('Can\'t Get File')
  // }
}

export let getFiles = (req, res) => {
  res.send('__get Files');
  // try {
  //   res.send(fileService.getAllFiles());
  // } catch(err) {
  //   res.sendStatus(400);
  // }
};