import Loki from 'lokijs';

const DB_NAME = 'db.json';
const UPLOAD_PATH = 'tmp/uploads';

export default class Database {
  public lokidb: Loki;
  private static instance: Database;

  private constructor() {
    this.lokidb = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });
    //this.lokidb.saveDatabase();
  }

  public static shared(): Database {
    if(!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}