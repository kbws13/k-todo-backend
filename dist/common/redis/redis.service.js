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
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
let RedisService = class RedisService {
    getClient() {
        return this.client;
    }
    async get(redisKey) {
        return await this.client.get(redisKey);
    }
    async set(redisKey, value, seconds) {
        const options = seconds ? { EX: seconds } : {};
        return await this.client.set(redisKey, value, options);
    }
    async hSet(redisKey, value) {
        const newValue = Object.entries(value).flat().map(item => String(item));
        return await this.client.hSet(redisKey, newValue);
    }
    async hGetAll(redisKey) {
        if (!redisKey)
            return null;
        return await this.client.hGetAll(redisKey);
    }
    async del(redisKey) {
        return await this.client.del(redisKey);
    }
};
exports.RedisService = RedisService;
__decorate([
    (0, common_1.Inject)('NEST_REDIS'),
    __metadata("design:type", Object)
], RedisService.prototype, "client", void 0);
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)()
], RedisService);
//# sourceMappingURL=redis.service.js.map