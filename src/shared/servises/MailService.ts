import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import * as nodemailer from 'nodemailer';

config({ path: ['.env.local'] });

@Injectable()
export class MailService {
  private static instance: MailService | null = null;
  private transporter: nodemailer.Transporter;

  constructor() {
    if (MailService.instance) {
      return MailService.instance;
    }

    MailService.instance = this;

    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendMail(mailOptions: nodemailer.SendMailOptions) {
    const result = await this.transporter.sendMail(mailOptions);

    return result;
  }
}
