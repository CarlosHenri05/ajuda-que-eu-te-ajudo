import { Body, Controller, Post } from '@nestjs/common';
import { ReportDto, ReportResponse } from 'src/dto/report.dto';
import { ReportService } from 'src/service/report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('create')
  async createReport(@Body() body: ReportDto): Promise<ReportResponse> {
    const result = await this.reportService.createReport(body);

    /** O Objetivo daqui é ter um serviço em Python
     * que irá validar a imagem e retornar se ela é válida ou não.
     * Motivo: A imagem pode conter conteúdo impróprio ou ilegal.
     */
    return {
      approved: true,
      message: 'Teste',
    };
  }
}
