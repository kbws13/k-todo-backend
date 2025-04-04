import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {AllowNoToken} from "./common/decorators/token.decorator";
import {AllowNoPermission} from "./common/decorators/permission.decorator";

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AllowNoToken()
  getHello(): string {
    return this.appService.getHello();
  }
}
