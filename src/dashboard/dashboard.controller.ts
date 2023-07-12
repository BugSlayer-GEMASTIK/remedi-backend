import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ResponseUtil } from 'src/common/utils/response.util';
import { GetDashboardDTO } from './dashboard.DTO';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private responseUtil: ResponseUtil,
  ) {}

  @Get('')
  async find(@Query() query: GetDashboardDTO) {
    const payload = await this.dashboardService.find(query);
    return this.responseUtil.response({}, { payload });
  }
}
