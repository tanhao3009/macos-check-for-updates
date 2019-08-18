import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export type FileDocument = mongoose.Document & {
  originalName: string;
  fileName: string;
  mimetype: string;
  toJSON: () => {};
};

const fileSchema = new mongoose.Schema({
  originalName: { type: String, unique: true },
  fileName: String,
  mimetype: String
}, { timestamps: true });

fileSchema.plugin(uniqueValidator, {message: 'File already existed.'});

fileSchema.methods.toJSON = function() {
  return {
    fileName: this.fileName,
    originalName: this.originalName,
    mimetype: this.mimetype
  };
};

export const File = mongoose.model<FileDocument>("File", fileSchema);