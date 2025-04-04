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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
let UserEntity = class UserEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 32, comment: '用户名' }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, comment: '用户密码' }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false, comment: '哈希加密的盐' }),
    __metadata("design:type", String)
], UserEntity.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', comment: '用户类型 0 管理员 1 普通用户', default: 1 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "userRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', comment: '用户邮箱', default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', comment: '用户头像', default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', comment: '用户备注', default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', comment: '创建时间' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', comment: '更新时间' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "updateTime", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('user')
], UserEntity);
//# sourceMappingURL=user.entity.js.map