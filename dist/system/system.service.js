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
exports.SystemService = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("../common/mail/mail.service");
const redis_service_1 = require("../common/redis/redis.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const utils_1 = require("../common/utils");
let SystemService = class SystemService {
    async sendMailForRegistry(email, text) {
        const { code } = await this.mailService.sendMail(email, text);
        const redisKey = (0, utils_1.getRedisKey)("registry_code:", email);
        await this.redisService.set(redisKey, code, 60 * 5);
        return '发送成功';
    }
    async upload(file, type) {
        return {
            url: `http://localhost:3333/${file.path}`,
            type
        };
    }
};
exports.SystemService = SystemService;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", mail_service_1.MailService)
], SystemService.prototype, "mailService", void 0);
__decorate([
    (0, common_1.Inject)(redis_service_1.RedisService),
    __metadata("design:type", redis_service_1.RedisService)
], SystemService.prototype, "redisService", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity),
    __metadata("design:type", typeorm_2.Repository)
], SystemService.prototype, "userRepository", void 0);
exports.SystemService = SystemService = __decorate([
    (0, common_1.Injectable)()
], SystemService);
//# sourceMappingURL=system.service.js.map