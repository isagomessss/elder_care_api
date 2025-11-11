import { Module } from '@nestjs/common';
import { IdososService } from './idosos.service';
import { IdososController } from './idosos.controller';

@Module({
  controllers: [IdososController],
  providers: [IdososService],
})
export class IdososModule {}
