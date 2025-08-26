import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TodoListEntity} from "./entity/todo-list.entity";
import {TodoListController} from "./todo-list.controller";
import {TodoListService} from "./todo-list.service";
import {UserModule} from "../user/user.module";
import {LoggerModule} from "../common/logger/logger.module";
import {TodoEntity} from "../todo/entity/todo.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TodoListEntity, TodoEntity]),
        UserModule,
        LoggerModule,
    ],
    controllers: [TodoListController],
    providers: [TodoListService],
    exports: [TodoListService]
})
export class TodoListModule {}
