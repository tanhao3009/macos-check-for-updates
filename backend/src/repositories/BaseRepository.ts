// import all interfaces
import { IRead } from './interfaces/IRead';
import { IWrite } from './interfaces/IWrite';

// class can only be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  
}