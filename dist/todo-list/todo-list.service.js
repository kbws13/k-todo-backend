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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const todo_list_entity_1 = require("./entity/todo-list.entity");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const todo_entity_1 = require("../todo/entity/todo.entity");
let TodoListService = class TodoListService {
    async list(userId) {
        const todoList = await this.todoListRepository.find({
            where: { userId },
            order: { createTime: 'DESC' },
        });
        return {
            todoList
        };
    }
    async add(createTodoListDto, userId) {
        const todoList = (0, class_transformer_1.plainToClass)(todo_list_entity_1.TodoListEntity, { ...createTodoListDto, userId, }, { ignoreDecorators: true });
        return await this.todoListRepository.save(todoList);
    }
    async getById(id, userId) {
        return await this.todoListRepository.findOne({
            where: { id, userId }
        });
    }
    async update(updateTodoListDto, userId) {
        const todoList = await this.todoListRepository.findOne({
            where: { id: updateTodoListDto.id, userId }
        });
        if (!todoList) {
            throw new Error('TodoList not found');
        }
        return await this.todoListRepository.save({
            ...todoList,
            ...updateTodoListDto,
        });
    }
    async delete(id, userId) {
        const todoList = await this.todoListRepository.findOne({ where: { id, userId } });
        if (!todoList) {
            throw new Error('TodoList not found or access denied');
        }
        await this.todoRepository.delete({ todoListId: id, userId: userId });
        return await this.todoListRepository.delete({ id, userId });
    }
};
exports.TodoListService = TodoListService;
__decorate([
    (0, typeorm_1.InjectRepository)(todo_list_entity_1.TodoListEntity),
    __metadata("design:type", typeorm_2.Repository)
], TodoListService.prototype, "todoListRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(todo_entity_1.TodoEntity),
    __metadata("design:type", typeorm_2.Repository)
], TodoListService.prototype, "todoRepository", void 0);
exports.TodoListService = TodoListService = __decorate([
    (0, common_1.Injectable)()
], TodoListService);
//# sourceMappingURL=todo-list.service.js.map