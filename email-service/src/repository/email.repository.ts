import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailBodyDto } from 'src/dto/email.dto';
import { Email } from 'src/model/email.model';

@Injectable()
export class EmailRepository {
  constructor(
    @InjectModel(Email.name) private readonly emailModel: Model<Email>,
  ) {}

  async saveEmail(emailBody: EmailBodyDto): Promise<Email> {
    const email = await new this.emailModel({
      to: emailBody.to,
      from: emailBody.from,
      subject: emailBody.subject,
      text: JSON.stringify(emailBody.text),
    }).save();

    return email;
  }
}
