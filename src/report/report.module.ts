import {Module} from '@nestjs/common';
import {ReportService} from './report.service';
import {ReportController} from './report.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReportEntity} from "./entities/report.entity";
import {TodoListModule} from "../todo-list/todo-list.module";
import {TodoModule} from "../todo/todo.module";
import {UserModule} from "../user/user.module";
import {TodoEntity} from "../todo/entity/todo.entity";
import {TodoListEntity} from "../todo-list/entity/todo-list.entity";

@Module({
  imports: [
      TypeOrmModule.forFeature([ReportEntity, TodoEntity, TodoListEntity]),
      TodoModule,
      TodoListModule,
      UserModule,
  ],
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportModule {}
