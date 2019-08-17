export class User {
  private email: string;
  private password: string;
  private passwordResetToken: string;
  private passwordResetExpires: Date;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}