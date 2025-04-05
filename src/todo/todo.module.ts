import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TodoEntity} from "./emtity/todo.entity";
import {UserModule} from "../user/user.module";
import {LoggerModule} from "../common/logger/logger.module";
import {TodoController} from "./todo.controller";
import {TodoService} from "./todo.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([TodoEntity]),
        UserModule,
        LoggerModule,
    ],
    controllers: [TodoController],
    providers: [TodoService],
    exports: [TodoService]
})
export class TodoModule {}
