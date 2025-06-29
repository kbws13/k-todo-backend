import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import {HttpModule, HttpService} from "@nestjs/axios";
import {LoggerModule} from "../common/logger/logger.module";

@Module({
  imports: [
      HttpModule,
      LoggerModule,
  ],
  controllers: [NewsController]
})
export class NewsModule {}
