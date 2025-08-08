import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Report } from 'generated/prisma';
import { ReportDto } from 'src/dto/report.dto';
import { ReportRepository } from 'src/repository/report.repository';

@Injectable()
export class ReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async createReport(reportData: ReportDto): Promise<Report> {
    try {
      const newReport = await this.reportRepository.createReport(reportData);

      return newReport;
    } catch (error) {
      if (error.code === 'P2006') {
        throw new BadRequestException('Bad inputs, try again');
      }

      console.log('error: ', error);

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
