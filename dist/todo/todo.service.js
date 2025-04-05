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
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const todo_entity_1 = require("./emtity/todo.entity");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
let TodoService = class TodoService {
    async list(todoListId, userId) {
        const todos = await this.todoRepository.find({
            where: { userId, todoListId },
            order: { createTime: 'DESC' }
        });
        return {
            todos
        };
    }
    async add(createTodoDto, userId) {
        const todo = (0, class_transformer_1.plainToClass)(todo_entity_1.TodoEntity, { ...createTodoDto, userId }, { ignoreDecorators: true });
        return await this.todoRepository.save(todo);
    }
    async getById(id, userId) {
        return await this.todoRepository.findOne({
            where: { id, userId }
        });
    }
    async update(updateTodoDto, userId) {
        const todo = await this.todoRepository.findOne({ where: { id: updateTodoDto.id, userId } });
        if (!todo) {
            throw new Error('TodoList not found');
        }
        return await this.todoRepository.save({
            ...todo,
            ...updateTodoDto,
        });
    }
    async delete(id, userId) {
        return await this.todoRepository.delete({ id, userId });
    }
};
exports.TodoService = TodoService;
__decorate([
    (0, typeorm_1.InjectRepository)(todo_entity_1.TodoEntity),
    __metadata("design:type", typeorm_2.Repository)
], TodoService.prototype, "todoRepository", void 0);
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)()
], TodoService);
//# sourceMappingURL=todo.service.js.map