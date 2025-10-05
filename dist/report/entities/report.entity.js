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
exports.ReportEntity = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const dayjs_1 = __importDefault(require("dayjs"));
let ReportEntity = class ReportEntity {
    get taskIdsAsArray() {
        try {
            const ids = JSON.parse(this.taskIds);
            return Array.isArray(ids) ? ids : [];
        }
        catch {
            return [];
        }
    }
    setTaskIds(ids) {
        this.taskIds = JSON.stringify(ids);
    }
};
exports.ReportEntity = ReportEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], ReportEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, comment: '用户 id' }),
    __metadata("design:type", Number)
], ReportEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false, comment: '日报标题' }),
    __metadata("design:type", String)
], ReportEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false, comment: '日报内容' }),
    __metadata("design:type", String)
], ReportEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, default: 0, comment: '0:日报 1:周报' }),
    __metadata("design:type", Number)
], ReportEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false, default: '', comment: 'todo id 列表' }),
    __metadata("design:type", String)
], ReportEntity.prototype, "taskIds", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', comment: '创建时间' }),
    (0, class_transformer_1.Transform)(({ value }) => value ? (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm:ss') : null),
    __metadata("design:type", Date)
], ReportEntity.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', comment: '更新时间' }),
    (0, class_transformer_1.Transform)(({ value }) => value ? (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm:ss') : null),
    __metadata("design:type", Date)
], ReportEntity.prototype, "updateTime", void 0);
exports.ReportEntity = ReportEntity = __decorate([
    (0, typeorm_1.Entity)('report')
], ReportEntity);
//# sourceMappingURL=report.entity.js.map