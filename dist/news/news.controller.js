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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const token_decorator_1 = require("../common/decorators/token.decorator");
const logger_1 = require("../common/logger/logger");
let NewsController = class NewsController {
    async getNews(q, from, sortBy, apiKey) {
        const url = 'https://newsapi.org/v2/everything ';
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url, {
                params: {
                    q,
                    from,
                    sortBy,
                    apiKey,
                },
            }));
            this.logger.error(String(response.status), '');
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch news', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.NewsController = NewsController;
__decorate([
    (0, common_1.Inject)(axios_1.HttpService),
    __metadata("design:type", axios_1.HttpService)
], NewsController.prototype, "httpService", void 0);
__decorate([
    (0, common_1.Inject)(logger_1.Logger),
    __metadata("design:type", logger_1.Logger)
], NewsController.prototype, "logger", void 0);
__decorate([
    (0, token_decorator_1.AllowNoToken)(),
    (0, common_1.Get)('everything'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('sortBy')),
    __param(3, (0, common_1.Query)('apiKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getNews", null);
exports.NewsController = NewsController = __decorate([
    (0, common_1.Controller)('news')
], NewsController);
//# sourceMappingURL=news.controller.js.map