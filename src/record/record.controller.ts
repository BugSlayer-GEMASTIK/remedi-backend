import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RecordService } from './record.service';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createRecord() {
    return
  }
}
