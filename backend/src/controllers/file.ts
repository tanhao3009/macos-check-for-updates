import multer = require('multer');
import { Request, Response, NextFunction } from 'express'
import { fileFilter, loadCollection, cleanFolder } from '../utils/utils';
import { EMAIL_SENDER, EMAIL_SENDER_PASSWORD, prod } from '../utils/secrets';
import Mail from '../utils/Mail';

import * as path from 'path'
import * as fs from 'fs'

import { File, FileDocument } from '../models/File';

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
  file.originalName = fileUploaded.originalname;
  file.mimetype = fileUploaded.mimetype;
  console.log(fileUploaded);
  console.log(file);
  file.save((err) => {
    if (err) { return next(err); }
    if(prod) {
      let mail = new Mail(EMAIL_SENDER, EMAIL_SENDER_PASSWORD);
      mail.sendMail('New Release', 'The notification of new release', ['hungtq@flomail.net']);
    }
    return res.json({file: file.toJSON()});
  });

};

export let uploadFiles = (req: Request, res: Response, next: NextFunction) => {
  res.send("Not Yet Supported!");
};

/**
 * GET
 */

export let getFile = async (req, res, next) => {
  try {
    if(req.params.fileid === null) {
      return res.status(422).json({errors: {file: "fileid can't be empty"}});
    }

    File.findOne({originalName: req.params.fileid}, (err, existingFile: FileDocument) => {
      if (err) { return next(err); }
      if (existingFile) {
        res.setHeader('Content-Type', existingFile.mimetype);
        fs.createReadStream(path.join(UPLOAD_PATH, existingFile.fileName)).pipe(res);
      }
    });
  } catch {
    res.status(404).json({errors: 'Something wrong'});
  }
};

export let getFiles = (req, res) => {
  res.send('Not Yet Supported!');
};