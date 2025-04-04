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
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("./logger/logger");
let LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        const statusCode = res.statusCode;
        const logFormat = `
##############################################################################################################
RequestOriginal: ${req.originalUrl}
Method: ${req.method}
IP: ${req.ip}
StatusCode: ${statusCode}
Params: ${JSON.stringify(req.params)}
Query: ${JSON.stringify(req.query)}
Body: ${JSON.stringify(req.body)}
##############################################################################################################
`;
        next();
        if (statusCode >= 500) {
            this.logger.error(logFormat, 'Request LoggerMiddleware');
        }
        else if (statusCode >= 400) {
            this.logger.warn(logFormat, 'Request LoggerMiddleware');
        }
        else {
            this.logger.log(logFormat, 'Request LoggerMiddleware');
        }
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
__decorate([
    (0, common_1.Inject)(logger_1.Logger),
    __metadata("design:type", logger_1.Logger)
], LoggerMiddleware.prototype, "logger", void 0);
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
//# sourceMappingURL=logger.middleware.js.map