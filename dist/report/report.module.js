"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModule = void 0;
const common_1 = require("@nestjs/common");
const report_service_1 = require("./report.service");
const report_controller_1 = require("./report.controller");
const typeorm_1 = require("@nestjs/typeorm");
const report_entity_1 = require("./entities/report.entity");
const todo_list_module_1 = require("../todo-list/todo-list.module");
const todo_module_1 = require("../todo/todo.module");
const user_module_1 = require("../user/user.module");
const todo_entity_1 = require("../todo/entity/todo.entity");
const todo_list_entity_1 = require("../todo-list/entity/todo-list.entity");
let ReportModule = class ReportModule {
};
exports.ReportModule = ReportModule;
exports.ReportModule = ReportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([report_entity_1.ReportEntity, todo_entity_1.TodoEntity, todo_list_entity_1.TodoListEntity]),
            todo_module_1.TodoModule,
            todo_list_module_1.TodoListModule,
            user_module_1.UserModule,
        ],
        providers: [report_service_1.ReportService],
        controllers: [report_controller_1.ReportController]
    })
], ReportModule);
//# sourceMappingURL=report.module.js.map