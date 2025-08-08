import { Module } from '@nestjs/common';
import { ReportRepository } from './repository/report.repository';
import { ReportController } from './controller/report.controller';
import { MulterModule } from '@nestjs/platform-express';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ReportService } from './service/report.service';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
  ],
  controllers: [ReportController],
  providers: [ReportRepository, ReportService],
})
export class AppModule {}
