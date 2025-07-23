import { Module } from '@nestjs/common';
import { ReportService } from './service/report.service';
import { ReportController } from './controller/report.controller';
import { MulterModule } from '@nestjs/platform-express';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    HttpModule,
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class AppModule {}
