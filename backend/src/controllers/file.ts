import multer = require('multer');
import { Request, Response, NextFunction } from 'express'
import { fileFilter, loadCollection, cleanFolder } from '../utils/utils';
import { File } from '../models/File'

import * as path from 'path'
import * as fs from 'fs'

// FileServices
import * as fileService from '../services/FileService'

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
  let file = req.file;
  if (!file) {
    const error = new Error('Please upload a file')
    return next(error)
  }
  fileService.insertFile(file);
  res.send(file)
};

export let uploadFiles = (req: Request, res: Response, next: NextFunction) => {
  res.send("Sorry, Currently this function not yet supported!");
};

/**
 * GET
 */

export let getFile = async (req, res) => {
  try {
    if(req.params.id === null) {
      res.sendStatus(404);
      return;
      // fs.readFile(path.join(UPLOAD_PATH, req.params.id), (err, data) => {
      //   if (err) throw err;
      //   //console.log(data.toString());
      //   let toString: string = data.toString();
      //   res.send('toString');
      // });
    }

    let document: File = fileService.getFileForId(req.params.id);
    if (!document) {
      res.sendStatus(404);
      return;
    }

    res.setHeader('Content-Type', document.mimetype);
    fs.createReadStream(path.join(UPLOAD_PATH, document.id)).pipe(res);
  } catch {
    res.send('Can\'t Get File')
  }
}

export let getFiles = (req, res) => {
  try {
    res.send(fileService.getAllFiles());
  } catch(err) {
    res.sendStatus(400);
  }
};