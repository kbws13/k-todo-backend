"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const logger_1 = require("./common/logger/logger");
const common_1 = require("@nestjs/common");
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
    await app.listen(config.get('APP_PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map