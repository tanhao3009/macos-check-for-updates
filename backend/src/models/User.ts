export class User {
  private email: string;
  private password: string;
  private passwordResetToken: string;
  private passwordResetExpires: Date;

  constructor(email: string, password: string, passwordResetToken: string, passwordResetExpires: Date) {
    this.email = email;
    this.password = password;
    this.passwordResetToken = passwordResetToken;
    this.passwordResetExpires = passwordResetExpires;
  }
}