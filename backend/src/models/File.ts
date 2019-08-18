// export class File {
//   public id: string;
//   public fileName: string;
//   public mimetype: string;

//   constructor(id: string, fileName: string, mimetype: string) {
//     this.id = id;
//     this.fileName = fileName;
//     this.mimetype = mimetype;
//   }
// }

import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export type FileDocument = mongoose.Document & {
  originalname: string;
  fileName: string;
  mimetype: string;
  toJSON: () => {};
};

const fileSchema = new mongoose.Schema({
  originalname: { type: String, unique: true },
  fileName: String,
  mimetype: String
}, { timestamps: true });

fileSchema.plugin(uniqueValidator, {message: 'File already existed.'});

fileSchema.methods.toJSON = function() {
  return {
    fileName: this.fileName,
    originalname: this.originalname,
    mimetype: this.mimetype
  };
};

export const File = mongoose.model<FileDocument>("File", fileSchema);