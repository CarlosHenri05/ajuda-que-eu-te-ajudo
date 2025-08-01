import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailBodyDto } from 'src/dto/email.dto';
import { Email } from 'src/model/email.model';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailService: MailerService,
    @InjectModel(Email.name) private readonly emailModel: Model<Email>,
  ) {}

  async sendEmail(emailDto: EmailBodyDto): Promise<void> {
    await this.mailService.sendMail({
      to: emailDto.to,
      from: emailDto.from,
      subject: emailDto.subject,
      text: JSON.stringify(emailDto.text),
    });
  }

  async saveEmailOnDb(emailDto: EmailBodyDto): Promise<Email> {
    const email = new this.emailModel({
      to: emailDto.to,
      from: emailDto.from,
      subject: emailDto.subject,
      text: JSON.stringify(emailDto.text)
    }).save();

    return email;
  }
