import { File } from '../models/File'
import { FileRepository } from '../repositories/FileRepository'

const repository = new FileRepository('files');

export let insertFile = (file) => {
  let document = new File(file.filename, file.originalname, file.mimetype);
  repository.create(document);
}

export let getFileForId = (id: string) => {
  return repository.findOne(id);
}

export let getAllFiles = () => {
  let results = repository.getAll();
  return results;
};