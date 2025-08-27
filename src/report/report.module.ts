import {Module} from '@nestjs/common';
import {ReportService} from './report.service';
import {ReportController} from './report.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReportEntity} from "./entities/report.entity";
import {TodoListModule} from "../todo-list/todo-list.module";
import {TodoModule} from "../todo/todo.module";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
      TypeOrmModule.forFeature([ReportEntity]),
      TodoModule,
      TodoListModule,
      UserModule,
  ],
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportModule {}
