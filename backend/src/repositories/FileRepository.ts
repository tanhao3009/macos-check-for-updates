import Loki from 'lokijs';
import { Collection } from 'lokijs';
import * as baseRepository from './BaseRepository'
import { BaseRepository } from './BaseRepository'
//import { File } from '../models/File'

export class FileRepository extends BaseRepository<File> {
  // getAll(): any {
  //   //let col: Loki.Collection<any> = baseRepository.lokiCollection(this.collectionName, baseRepository.database);
  //   return super.getAll();
  // }

  // findOne(id: string): File {
  //   let file: {} = super.findOne(id);
  //   return new File(file['id'], file['fileName'], file['mimetype']);
  // }
}