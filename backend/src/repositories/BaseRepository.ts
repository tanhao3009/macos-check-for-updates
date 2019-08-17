// import * as express from 'express'
import Loki from 'lokijs';
//import { Collection } from 'lokijs';

// import all interfaces
import { IRead } from './interfaces/IRead';
import { IWrite } from './interfaces/IWrite';

// const DB_NAME = 'db.json';
// const UPLOAD_PATH = 'tmp/uploads';

// // loki configs
// console.log(`${UPLOAD_PATH}/${DB_NAME}`);
// export const database = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });

import Database from '../config/database';

// class can only be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public collectionName: string;
  public lokiCollection: Loki.Collection;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    
    Database.shared().lokidb.loadDatabase({}, () => {
      this.lokiCollection = Database.shared().lokidb.getCollection(this.collectionName);
      if(!this.lokiCollection)  {
        this.lokiCollection = Database.shared().lokidb.addCollection(this.collectionName, {});
      }
    });
  }

  async save(item?: T, callback?: (err: any) => void): Promise<boolean> {
    callback(null);
    return true;
  }

  async create(item: any): Promise<boolean> {
    try {
      var data = this.lokiCollection.insert(item);
      Database.shared().lokidb.saveDatabase();
      console.log('id = %s', data.$loki);
    } catch (err) {
      console.log('Failed to create item');
    }

    return true;
  }

  update(id: string, item: T): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  find(item: T): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string): any {
    let object = this.lokiCollection.findOne({
      'fileName': id
    });
    return object;
  }

  getAll(): any {
    return this.lokiCollection.data;
  }
}