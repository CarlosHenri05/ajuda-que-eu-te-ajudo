import {
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
import { firstValueFrom } from 'rxjs';

// Esse controller ainda não irá funcionar pois o serviço de verificação ainda está sendo CRIADO.

@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly httpService: HttpService,
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
    @Body() body: ReportDto,
  ): Promise<ReportResponse> {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get('http://127.0.0.1:8000/validate', {
          params: {
            image_url: `http://localhost:3000/uploads/${file.filename}`,
          },
        }),
      );

      if (!response.data.approved) {
        return {
          approved: false,
          message: response.data.message,
        };
      }

      await this.reportService.createReport({
        ...body,
        imagem_url: `http://localhost:3000/uploads/${file.filename}`,
      });

      return {
        approved: true,
        message: response.data.message,
      };
    } catch (error) {
      throw new HttpException(
        'Error processing the report',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
