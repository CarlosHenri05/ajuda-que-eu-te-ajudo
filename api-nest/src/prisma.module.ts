import { Module } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

const prismaProvider = {
  provide: PrismaClient,
  useValue: new PrismaClient(),
};

@Module({
  providers: [prismaProvider],
  exports: [prismaProvider],
})
export class PrismaModule {}
