import nodemailer from 'nodemailer'

export default class Mail {
  transporter: any;
  constructor(email: string, password: string) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password
      }
    });
  }

  async sendMail(subject: string, body: string, toAddr: string[]) {
    let mailOptions = {
      from: '"Mac Team 👻" <hungtq.noreply@gmail.com>',
      to: toAddr.toString(),
      subject: `[Mac Team: Notifications] ${subject.toLocaleUpperCase()}`,
      text: body
    };
    // send mail with defined transport object
    await this.transporter.sendMail(mailOptions, (error: Error, info: any) => {
      if (error) {
        console.log('Error: ' + error);
        console.log('Error: ' + info);
      }
    });
  }
}