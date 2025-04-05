"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const todo_list_entity_1 = require("./entity/todo-list.entity");
const todo_list_controller_1 = require("./todo-list.controller");
const todo_list_service_1 = require("./todo-list.service");
const user_module_1 = require("../user/user.module");
const logger_module_1 = require("../common/logger/logger.module");
let TodoListModule = class TodoListModule {
};
exports.TodoListModule = TodoListModule;
exports.TodoListModule = TodoListModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([todo_list_entity_1.TodoListEntity]),
            user_module_1.UserModule,
            logger_module_1.LoggerModule,
        ],
        controllers: [todo_list_controller_1.TodoListController],
        providers: [todo_list_service_1.TodoListService],
        exports: [todo_list_service_1.TodoListService]
    })
], TodoListModule);
//# sourceMappingURL=todo-list.module.js.map