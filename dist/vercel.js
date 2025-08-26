"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const logger_1 = require("./common/logger/logger");
const common_1 = require("@nestjs/common");
const express_1 = __importDefault(require("express"));
const expressServer = (0, express_1.default)();
let cachedHandler = null;
async function handler(req, res) {
    if (!cachedHandler) {
        const nestApp = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressServer), {
            cors: true,
            logger: ['error', 'warn'],
        });
        const config = nestApp.get(config_1.ConfigService);
        const prefix = config.get('API_PREFIX') || 'api';
        nestApp.setGlobalPrefix(prefix);
        nestApp.useLogger(nestApp.get(logger_1.Logger));
        nestApp.useGlobalPipes(new common_1.ValidationPipe());
        await nestApp.init();
        cachedHandler = expressServer;
    }
    return cachedHandler(req, res);
}
//# sourceMappingURL=vercel.js.map