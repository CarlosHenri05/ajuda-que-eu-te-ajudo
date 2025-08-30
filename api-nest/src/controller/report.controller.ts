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
import { firstValueFrom } from 'rxjs';
import { stateAndEmailMap } from '../common/constants/states.hashMap';

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
    @Body() reportData: ReportDto,
  ): Promise<ReportResponse> {
    if (!file) throw new BadRequestException('The image is needed.');

    const imageUrl = `http://localhost:3000/uploads/${file.filename}`;

    try {
      const imageValidatorResponse = await firstValueFrom(
        this.httpService.get('http://127.0.0.1:8000/validate', {
          params: {
            image_url: imageUrl,
          },
        }),
      );

      if (!imageValidatorResponse.data.approved) {
        return {
          approved: false,
          message: imageValidatorResponse.data.message,
        };
      }
    } catch (error) {
      throw new BadRequestException(`Error validating the image: ${error}`);
    }

    await this.reportService.createReport({
      ...reportData,
      imagem_url: imageUrl,
    });

    try {
      const emailServiceResponse = await firstValueFrom(
        this.httpService.post('http://127.0.0.1:3001/send', {
          subject: 'New Report Created',
          to: stateAndEmailMap.get(reportData.estado),
          text: JSON.stringify(reportData),
        }),
      );
    } catch (error) {
      console.log('Erro:  ' + error);
      throw new HttpException(
        'Error with email service',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      approved: true,
      message: 'Everything gone right.',
    };
  }
}
