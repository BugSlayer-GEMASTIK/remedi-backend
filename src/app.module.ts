import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { RecordModule } from './record/record.module';

@Module({
  imports: [ConfigModule.forRoot(), RecordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
