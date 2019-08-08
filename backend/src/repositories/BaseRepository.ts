import * as express from 'express'
import Loki from 'lokijs';
import { Collection } from 'lokijs';

// import all interfaces
import { IRead } from './interfaces/IRead';
import { IWrite } from './interfaces/IWrite';

const DB_NAME = 'db.json';
const UPLOAD_PATH = 'tmp/uploads';

// loki configs
console.log(`${UPLOAD_PATH}/${DB_NAME}`);
export const database = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });

// class can only be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public collectionName: string;
  private lokiCollection: Loki.Collection;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    database.loadDatabase({}, () => {
      this.lokiCollection = database.getCollection(this.collectionName);
      if(!this.lokiCollection)  {
        this.lokiCollection = database.addCollection(this.collectionName, {});
      }

      console.log('Constructor: Initialized!');
    });
  }

  async create(item: any): Promise<boolean> {
    try {
      var data = this.lokiCollection.insert(item);
      database.saveDatabase();
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