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
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
const user_service_1 = require("../user/user.service");
const create_todo_dto_1 = require("./dto/create-todo.dto");
const update_todo_dto_1 = require("./dto/update-todo.dto");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    list(id, req) {
        const userId = this.userService.verifyToken(req.headers['token']);
        return this.todoService.list(id, userId);
    }
    add(createTodoDto, req) {
        const userId = this.userService.verifyToken(req.headers['token']);
        return this.todoService.add(createTodoDto, userId);
    }
    getById(id, req) {
        const userId = this.userService.verifyToken(req.headers['token']);
        return this.todoService.getById(id, userId);
    }
    update(updateTodoDto, req) {
        const userId = this.userService.verifyToken(req.headers['token']);
        return this.todoService.update(updateTodoDto, userId);
    }
    delete(id, req) {
        const userId = this.userService.verifyToken(req.headers['token']);
        return this.todoService.delete(id, userId);
    }
};
exports.TodoController = TodoController;
__decorate([
    (0, common_1.Inject)(user_service_1.UserService),
    __metadata("design:type", user_service_1.UserService)
], TodoController.prototype, "userService", void 0);
__decorate([
    (0, common_1.Get)('list/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_todo_dto_1.CreateTodoDto, Object]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "add", null);
__decorate([
    (0, common_1.Get)("getById/:id"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_todo_dto_1.UpdateTodoDto, Object]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "delete", null);
exports.TodoController = TodoController = __decorate([
    (0, common_1.Controller)('todo'),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
//# sourceMappingURL=todo.controller.js.map