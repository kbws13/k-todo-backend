import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TodoEntity} from "./entity/todo.entity";
import {UserModule} from "../user/user.module";
import {LoggerModule} from "../common/logger/logger.module";
import {TodoController} from "./todo.controller";
import {TodoService} from "./todo.service";
import {TodoListModule} from "../todo-list/todo-list.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([TodoEntity]),
        UserModule,
        LoggerModule,
        TodoListModule,
    ],
    controllers: [TodoController],
    providers: [TodoService],
    exports: [TodoService]
})
export class TodoModule {}
