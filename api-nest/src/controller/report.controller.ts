import {
  BadRequestException,
  Body,
  Controller,
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
    @Body() reportData: ReportDto,
  ): Promise<ReportResponse> {
    if (!file) throw new BadRequestException('The image is needed.');

    const imageUrl = `http://localhost:3000/uploads/${file.filename}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get('http://127.0.0.1:8000/validate', {
          params: {
            image_url: imageUrl,
          },
        }),
      );

      if (!response.data.approved) {
        return {
          approved: false,
          message: response.data.message,
        };
      }
    } catch (error) {
      throw new BadRequestException(`Error validating the image: ${error}`);
    }

    await this.reportService.createReport({
      ...reportData,
      imagem_url: imageUrl,
    });

    // TO-DO: Hard-code government provincies email's on a list or on an prisma enum

    return {
      approved: true,
      message: 'Everything gone right.',
    };
  }
}
