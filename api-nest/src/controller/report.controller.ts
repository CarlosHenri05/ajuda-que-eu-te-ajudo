import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReportDto, ReportResponse } from 'src/dto/report.dto';
import { ReportService } from 'src/service/report.service';
import { diskStorage } from 'multer';
import { HttpService } from '@nestjs/axios';
import { RequestService } from 'src/service/request.service';

// Esse controller ainda não irá funcionar pois o serviço de verificação ainda está sendo CRIADO.

@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly httpService: HttpService,
    private readonly requestService: RequestService,
  ) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async createReport(
    @UploadedFile() file: Express.Multer.File,
    @Body() reportData: ReportDto,
  ): Promise<ReportResponse> {
    if (!file) throw new BadRequestException('The image is needed.');

    const imageUrl = `http://localhost:3000/uploads/${file.filename}`;

    const imageValidator =
      await this.requestService.imageServiceRequest(imageUrl);

    if (!imageValidator.approved) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    const emailRequest =
      await this.requestService.emailServiceRequest(reportData);

    if (reportData.enviar_email && !emailRequest.approved) {
      throw new HttpException(
        'Bad request with emailService, try again',
        HttpStatus.BAD_REQUEST,
      );
    }
    const savedReport = await this.reportService.createReport(reportData);

    return {
      approved: true,
      message: 'Everything went right.',
    };
  }
}
