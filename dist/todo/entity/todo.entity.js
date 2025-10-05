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
exports.TodoEntity = void 0;
const typeorm_1 = require("typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
const class_transformer_1 = require("class-transformer");
let TodoEntity = class TodoEntity {
};
exports.TodoEntity = TodoEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], TodoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false, comment: '任务名' }),
    __metadata("design:type", String)
], TodoEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: '备注' }),
    __metadata("design:type", String)
], TodoEntity.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, comment: 'todoList id' }),
    __metadata("design:type", Number)
], TodoEntity.prototype, "todoListId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: false, default: false, comment: '0 未完成 1 已完成' }),
    __metadata("design:type", Boolean)
], TodoEntity.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, comment: '提醒时间' }),
    (0, class_transformer_1.Transform)(({ value }) => value ? (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm:ss') : null),
    __metadata("design:type", Date)
], TodoEntity.prototype, "remindTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, comment: '用户 id' }),
    __metadata("design:type", Number)
], TodoEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', comment: '创建时间' }),
    (0, class_transformer_1.Transform)(({ value }) => value ? (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm:ss') : null),
    __metadata("design:type", Date)
], TodoEntity.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', comment: '更新时间' }),
    (0, class_transformer_1.Transform)(({ value }) => value ? (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm:ss') : null),
    __metadata("design:type", Date)
], TodoEntity.prototype, "updateTime", void 0);
exports.TodoEntity = TodoEntity = __decorate([
    (0, typeorm_1.Entity)('todo')
], TodoEntity);
//# sourceMappingURL=todo.entity.js.map