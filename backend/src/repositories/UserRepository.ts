import { BaseRepository } from './BaseRepository'
import { User } from '../models/User'

import Loki from 'lokijs';
import Database from '../config/database';

export class UserRepository extends BaseRepository<User> {
  async save(item?: User, callback?: (err: any) => void): Promise<boolean> {
    try {
      console.log(this.lokiCollection);
      var data = this.lokiCollection.insert(item);
      var db: Loki = Database.shared().lokidb;
      console.log(db);
      Database.shared().lokidb.saveDatabase();
      console.log('id = %s', data.$loki);
      callback(null);
    } catch (err) {
      console.log('Failed to save User');
      callback(err);
    }

    return true;
  }
}