import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {AllowNoToken} from "./common/decorators/token.decorator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AllowNoToken()
  getHello(): string {
    return this.appService.getHello();
  }
}
