import { Module } from '@nestjs/common';
import { ReportService } from './service/report.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ReportService],
})
export class AppModule {}
