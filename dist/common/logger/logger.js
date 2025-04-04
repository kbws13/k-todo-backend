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
exports.Logger = void 0;
const common_1 = require("@nestjs/common");
require("winston-daily-rotate-file");
const winston_1 = require("winston");
const chalk_1 = __importDefault(require("chalk"));
const dayjs_1 = __importDefault(require("dayjs"));
let Logger = class Logger {
    constructor() {
        this.logger = (0, winston_1.createLogger)({
            level: 'debug',
            transports: [
                new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.printf(({ context, level, message, timestamp }) => {
                        const appStr = chalk_1.default.green(`[NEST]`);
                        const contextStr = chalk_1.default.yellow(`[${context}]`);
                        return `${appStr} ${timestamp} ${level} ${contextStr} ${message} `;
                    }))
                }),
            ]
        });
    }
    log(message, context) {
        const timestamp = (0, dayjs_1.default)(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.logger.log('info', message, { context, timestamp });
    }
    info(message, context) {
        const timestamp = (0, dayjs_1.default)(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.logger.info(message, { context, timestamp });
    }
    error(message, context) {
        const timestamp = (0, dayjs_1.default)(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.logger.error(message, { context, timestamp });
    }
    warn(message, context) {
        const timestamp = (0, dayjs_1.default)(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.logger.warn(message, { context, timestamp });
    }
};
exports.Logger = Logger;
exports.Logger = Logger = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], Logger);
//# sourceMappingURL=logger.js.map