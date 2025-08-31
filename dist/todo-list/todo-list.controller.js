"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListController = void 0;
const common_1 = require("@nestjs/common");
const todo_list_service_1 = require("./todo-list.service");
const user_service_1 = require("../user/user.service");
const create_todo_list_dto_1 = require("./dto/create-todo-list.dto");
const update_todo_list_dto_1 = require("./dto/update-todo-list.dto");
let TodoListController = class TodoListController {
    constructor(todoListService) {
        this.todoListService = todoListService;
    }
    list(req) {
        const userId = this.userService.verifyToken(req.headers['token']);
        return this.todoListService.list(userId);
    }
    add(req, createTodoListDto) {
        const userId = this.userService.verifyToken(req.headers['token']);
        return this.todoListService.add(createTodoListDto, userId);
    }
    getById(id, req) {
        const userId = this.userService.verifyToken(req.headers['token']);
        return this.todoListService.getById(id, userId);
    }
    update(todoListUpdateDto, req) {
        const userId = this.userService.verifyToken(req.headers['token']);
        return this.todoListService.update(todoListUpdateDto, userId);
    }
    delete(id, req) {
        const userId = this.userService.verifyToken(req.headers['token']);
        return this.todoListService.delete(id, userId);
    }
    overall(req) {
        const userId = this.userService.verifyToken(req.headers['token']);
        return this.todoListService.overall(userId);
    }
};
exports.TodoListController = TodoListController;
__decorate([
    (0, common_1.Inject)(user_service_1.UserService),
    __metadata("design:type", user_service_1.UserService)
], TodoListController.prototype, "userService", void 0);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TodoListController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_todo_list_dto_1.CreateTodoListDto]),
    __metadata("design:returntype", void 0)
], TodoListController.prototype, "add", null);
__decorate([
    (0, common_1.Get)('getById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TodoListController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_todo_list_dto_1.UpdateTodoListDto, Object]),
    __metadata("design:returntype", void 0)
], TodoListController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TodoListController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("overall"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TodoListController.prototype, "overall", null);
exports.TodoListController = TodoListController = __decorate([
    (0, common_1.Controller)('todoList'),
    __metadata("design:paramtypes", [todo_list_service_1.TodoListService])
], TodoListController);
//# sourceMappingURL=todo-list.controller.js.map