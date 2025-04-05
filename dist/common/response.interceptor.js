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
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const logger_1 = require("./logger/logger");
const class_transformer_1 = require("class-transformer");
let ResponseInterceptor = class ResponseInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        const req = context.getArgByIndex(1).req;
        const res = context.switchToHttp().getResponse();
        return next.handle().pipe((0, operators_1.map)((data) => {
            data = (0, class_transformer_1.instanceToPlain)(data);
            const logFormat = `
##############################################################################################################
Request original url: ${req.originalUrl}
Method: ${req.method}
IP: ${req.ip}
Response data: ${data.socket ? null : JSON.stringify(data)}
##############################################################################################################
`;
            this.logger.info(logFormat, 'Response ResponseInterceptor');
            return {
                data,
                code: res.statusCode,
                success: true
            };
        }));
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_1.Logger])
], ResponseInterceptor);
//# sourceMappingURL=response.interceptor.js.map