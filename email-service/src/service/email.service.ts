import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { EmailBodyDto } from 'src/dto/email.dto';
import { Email } from 'src/model/email.model';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailService: MailerService,
    @InjectModel(Email.name) private readonly emailModel: Model<Email>,
  ) {}

  async sendEmail(emailBody: EmailBodyDto): Promise<void> {
    try {
      await this.mailService.sendMail({
        to: emailBody.to,
        from: emailBody.from,
        subject: emailBody.subject,
        text: JSON.stringify(emailBody.text),
      });

      await this.saveEmailOnDb(emailBody);
    } catch (error) {
      if (error.code === 'ECONNECTION') {
        throw new HttpException(
          'This service is unavailable',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      if (error.code === 'EAUTH') {
        throw new HttpException(
          'Authentication failed',
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (error.code === 'EENVELOPE') {
        throw new HttpException(
          'Invalid email address',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        `Something went wrong: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async saveEmailOnDb(emailBody: EmailBodyDto): Promise<Email> {
    try {
      const email = await new this.emailModel({
        to: emailBody.to,
        from: emailBody.from,
        subject: emailBody.subject,
        text: JSON.stringify(emailBody.text),
      }).save();

      return email;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new HttpException(
          'Bad request, try checking your input fields again',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        `Something went wrong: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
