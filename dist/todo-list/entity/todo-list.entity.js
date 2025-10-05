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
exports.TodoListEntity = void 0;
const typeorm_1 = require("typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
const class_transformer_1 = require("class-transformer");
let TodoListEntity = class TodoListEntity {
};
exports.TodoListEntity = TodoListEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], TodoListEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: false, comment: '列表名' }),
    __metadata("design:type", String)
], TodoListEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true, comment: '任务列表描述' }),
    __metadata("design:type", String)
], TodoListEntity.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, comment: '用户 id' }),
    __metadata("design:type", Number)
], TodoListEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0, comment: '任务总数' }),
    __metadata("design:type", Number)
], TodoListEntity.prototype, "totalCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0, comment: '已经完成的数量' }),
    __metadata("design:type", Number)
], TodoListEntity.prototype, "completeCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', comment: '创建时间' }),
    (0, class_transformer_1.Transform)(({ value }) => value ? (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm:ss') : null),
    __metadata("design:type", Date)
], TodoListEntity.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', comment: '更新时间' }),
    (0, class_transformer_1.Transform)(({ value }) => value ? (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm:ss') : null),
    __metadata("design:type", Date)
], TodoListEntity.prototype, "updateTime", void 0);
exports.TodoListEntity = TodoListEntity = __decorate([
    (0, typeorm_1.Entity)('todoList')
], TodoListEntity);
//# sourceMappingURL=todo-list.entity.js.map