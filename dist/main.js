"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const logger_1 = require("./common/logger/logger");
const common_1 = require("@nestjs/common");
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
async function createNestApp() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server), {
        cors: true,
        logger: ['error', 'warn'],
    });
    const config = app.get(config_1.ConfigService);
    const prefix = config.get('API_PREFIX');
    app.setGlobalPrefix(prefix);
    app.useLogger(app.get(logger_1.Logger));
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.init();
    return app;
}
let app;
exports.default = async (req, res) => {
    if (!app) {
        app = await createNestApp();
    }
    return server(req, res);
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
        logger: ['error', 'warn'],
    });
    const config = app.get(config_1.ConfigService);
    const prefix = config.get('API_PREFIX');
    app.setGlobalPrefix(prefix);
    app.useLogger(app.get(logger_1.Logger));
    app.useGlobalPipes(new common_1.ValidationPipe());
    console.log('APP_PORT', config.get('APP_PORT'));
    await app.listen(config.get('APP_PORT') || 3000);
}
if (require.main === module) {
    bootstrap();
}
//# sourceMappingURL=main.js.map