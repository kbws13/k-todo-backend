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
exports.HttpExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("./logger/logger");
let HttpExceptionsFilter = class HttpExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        const logFormat = `
##############################################################################################################
Request original url: ${request.originalUrl}
Method: ${request.method}
IP: ${request.ip}
Status code: ${status}
Response: ${exception.toString() +
            `（${exceptionResponse?.message || exception.message}）`}
##############################################################################################################
`;
        this.logger.error(logFormat, 'HttpException filter ');
        response.status(status).json({
            code: status,
            success: false,
            message: exceptionResponse?.message || exception.message,
            type: `${status >= common_1.HttpStatus.INTERNAL_SERVER_ERROR ? 'Service Error' : 'Client Error'}`,
        });
    }
};
exports.HttpExceptionsFilter = HttpExceptionsFilter;
__decorate([
    (0, common_1.Inject)(logger_1.Logger),
    __metadata("design:type", logger_1.Logger)
], HttpExceptionsFilter.prototype, "logger", void 0);
exports.HttpExceptionsFilter = HttpExceptionsFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionsFilter);
//# sourceMappingURL=http-exceptions.filter.js.map