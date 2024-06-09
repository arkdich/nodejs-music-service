import { Controller, Get, Header, Query } from '@nestjs/common';
import { ResetPaswordDto } from './model/query.dto';
import { ViewService } from './view.service';
import { PublicRoute } from 'src/shared/decorators/PublicRoute';

@Controller('view')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @PublicRoute()
  @Get('password-reset')
  @Header('Content-Type', 'text/html')
  async resetPassword(@Query() { token }: ResetPaswordDto) {
    const html = await this.viewService.resetPassword(token);

    return html;
  }
}
