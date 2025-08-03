import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EmailBodyDto } from 'src/dto/email.dto';
import { EmailService } from 'src/service/email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() emailBody: EmailBodyDto) {
    await this.emailService.sendEmail(emailBody);
  }
}
