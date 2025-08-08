import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { PrismaClient, Report } from 'generated/prisma';
import { ReportDto } from 'src/dto/report.dto';

@Injectable()
export class ReportRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createReport(reportData: ReportDto): Promise<Report> {
    return await this.prisma.report.create({
      data: reportData,
    });
  }

  async getReportById(id: number): Promise<Report | null> {
    return await this.prisma.report.findFirst({
      where: {
        id: id,
      },
    });
  }

  async getAllReports(): Promise<Report[]> {
    return await this.prisma.report.findMany();
  }

  async deleteReport(id: number): Promise<void> {
    await this.prisma.report.delete({
      where: {
        id: id,
      },
    });
  }
}
