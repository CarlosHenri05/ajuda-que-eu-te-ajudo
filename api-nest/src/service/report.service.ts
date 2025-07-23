import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { PrismaClient, Report } from 'generated/prisma';
import { ReportDto } from 'src/dto/report.dto';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaClient) {}

  async createReport(reportData: ReportDto): Promise<Report> {
    const report = await this.prisma.report.create({
      data: reportData,
    });

    return report;
  }

  async getReportById(id: number): Promise<Report | null> {
    try {
      const report = await this.prisma.report.findUnique({
        where: {
          id: id,
        },
      });
      return report;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllReports(): Promise<Report[]> {
    try {
      const reports = await this.prisma.report.findMany();

      return reports;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateReport(
    id: number,
    reportData: Partial<ReportDto>,
  ): Promise<void> {
    try {
      await this.prisma.report.update({
        where: {
          id: id,
        },
        data: reportData,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
      }

      if (error.code === 'P2006') {
        throw new HttpException(
          'Invalid data provided',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteReport(id: number): Promise<void> {
    try {
      await this.prisma.report.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
