import mongoose from 'mongoose';
import crypto from "crypto";
import uniqueValidator from 'mongoose-unique-validator';

export type FileDocument = mongoose.Document & {
  originalname: string;
  filename: string;
  mimetype: string;
  toJSON: () => {};
};

const fileSchema = new mongoose.Schema({
  originalname: { type: String, unique: true },
  filename: String, 
  mimetype: String
}, { timestamps: true });

fileSchema.plugin(uniqueValidator, {message: 'File already existed.'});

fileSchema.methods.toJSON = function() {
  return {
    filename: this.filename,
    originalname: this.originalname,
    mimetype: this.mimetype
  };
};

export const File = mongoose.model<FileDocument>("File", fileSchema);