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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const report_entity_1 = require("./entities/report.entity");
const typeorm_2 = require("typeorm");
const todo_list_service_1 = require("../todo-list/todo-list.service");
const todo_service_1 = require("../todo/todo.service");
const dayjs_1 = __importDefault(require("dayjs"));
let ReportService = class ReportService {
    async getDailyReport(userId) {
        const todoLists = await this.todoListService.list(userId);
        let markdown = '';
        for (const list of todoLists) {
            const todos = await this.todoService.getCompletedToday(list.id, userId);
            if (todos.length > 0) {
                markdown += `## ${list.content}:\n`;
                markdown += todos.map(item => `- ${item.content}\n`);
            }
        }
        return await this.reportRepository.save({
            title: (0, dayjs_1.default)().format('YYYY-MM-DD'),
            content: markdown,
            userId: userId,
        });
    }
};
exports.ReportService = ReportService;
__decorate([
    (0, typeorm_1.InjectRepository)(report_entity_1.ReportEntity),
    __metadata("design:type", typeorm_2.Repository)
], ReportService.prototype, "reportRepository", void 0);
__decorate([
    (0, common_1.Inject)(todo_list_service_1.TodoListService),
    __metadata("design:type", todo_list_service_1.TodoListService)
], ReportService.prototype, "todoListService", void 0);
__decorate([
    (0, common_1.Inject)(todo_service_1.TodoService),
    __metadata("design:type", todo_service_1.TodoService)
], ReportService.prototype, "todoService", void 0);
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)()
], ReportService);
//# sourceMappingURL=report.service.js.map