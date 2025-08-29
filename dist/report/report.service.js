"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const todo_entity_1 = require("../todo/entity/todo.entity");
const genai_1 = require("@google/genai");
const path = __importStar(require("node:path"));
const fs = __importStar(require("node:fs"));
const ai = new genai_1.GoogleGenAI({ apiKey: 'AIzaSyBSXnMnGG1Uy_oAIFzj6Y0MxG9HXSrzh9U' });
let ReportService = class ReportService {
    async generateDailyReport(userId) {
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
    async generateWeeklyReport(userId) {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const diffToMonday = now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
        const monday = new Date(now);
        monday.setDate(diffToMonday);
        monday.setHours(0, 0, 0, 0);
        const nextMonday = new Date(monday);
        nextMonday.setDate(monday.getDate() + 7);
        const reportList = await this.reportRepository.find({
            where: {
                userId,
                createTime: (0, typeorm_2.Raw)((columnAlias) => `${columnAlias} >= :monday AND ${columnAlias} < :nextMonday`, { monday, nextMonday }),
            },
            order: {
                createTime: 'ASC',
            },
        });
        const prompt = await this.getPromptAsync();
        const res = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: JSON.stringify(reportList),
            config: {
                systemInstruction: prompt,
                thinkingConfig: {
                    thinkingBudget: 0
                }
            }
        });
        return res;
    }
    async getPromptAsync() {
        const filePath = path.join(process.cwd(), 'prompt.txt');
        return await fs.promises.readFile(filePath, 'utf-8');
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
__decorate([
    (0, typeorm_1.InjectRepository)(todo_entity_1.TodoEntity),
    __metadata("design:type", typeorm_2.Repository)
], ReportService.prototype, "todoRepository", void 0);
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)()
], ReportService);
//# sourceMappingURL=report.service.js.map