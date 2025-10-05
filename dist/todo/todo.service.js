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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const typeorm_2 = require("typeorm");
const todo_list_service_1 = require("../todo-list/todo-list.service");
const todo_entity_1 = require("./entity/todo.entity");
const dayjs_1 = __importDefault(require("dayjs"));
let TodoService = class TodoService {
    async list(todoListId, userId) {
        const todos = await this.todoRepository.find({
            where: { userId, todoListId },
            order: { createTime: 'DESC' }
        });
        return todos;
    }
    async add(createTodoDto, userId) {
        const todoList = await this.todoListService.getById(createTodoDto.todoListId, userId);
        todoList.totalCount++;
        await this.todoListService.update(todoList, userId);
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
    async complete(completeTdoDto, userId) {
        const todo = await this.getById(completeTdoDto.todoId, userId);
        const todoList = await this.todoListService.getById(todo.todoListId, userId);
        if (todoList == null) {
            throw new Error("todoList 不存在");
        }
        todo.completed = completeTdoDto.complete;
        await this.update({ ...todo }, userId);
        if (completeTdoDto.complete) {
            todoList.completeCount += 1;
        }
        else {
            todoList.completeCount -= 1;
        }
        await this.todoListService.update({ ...todoList }, userId);
        return true;
    }
    async getCompletedToday(todoListId, userId) {
        const startOfToday = (0, dayjs_1.default)().startOf('day').toDate();
        const endOfToday = (0, dayjs_1.default)().endOf('day').toDate();
        return this.todoRepository.find({
            where: {
                userId: userId,
                todoListId: todoListId,
                completed: true,
                updateTime: (0, typeorm_2.Between)(startOfToday, endOfToday)
            },
            order: {
                updateTime: 'ASC',
            },
        });
    }
};
exports.TodoService = TodoService;
__decorate([
    (0, typeorm_1.InjectRepository)(todo_entity_1.TodoEntity),
    __metadata("design:type", typeorm_2.Repository)
], TodoService.prototype, "todoRepository", void 0);
__decorate([
    (0, common_1.Inject)(todo_list_service_1.TodoListService),
    __metadata("design:type", todo_list_service_1.TodoListService)
], TodoService.prototype, "todoListService", void 0);
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)()
], TodoService);
//# sourceMappingURL=todo.service.js.map