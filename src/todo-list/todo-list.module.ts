import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TodoListEntity} from "./entity/todo-list.entity";
import {TodoListController} from "./todo-list.controller";
import {TodoListService} from "./todo-list.service";
import {UserModule} from "../user/user.module";
import {LoggerModule} from "../common/logger/logger.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([TodoListEntity]),
        UserModule,
        LoggerModule,
    ],
    controllers: [TodoListController],
    providers: [TodoListService],
    exports: [TodoListService]
})
export class TodoListModule {}
