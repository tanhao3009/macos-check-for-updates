export class File {
  public id: string;
  public fileName: string;
  public mimetype: string;

  constructor(id: string, fileName: string, mimetype: string) {
    this.id = id;
    this.fileName = fileName;
    this.mimetype = mimetype;
  }
}