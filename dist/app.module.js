"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const logger_module_1 = require("./common/logger/logger.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const http_exceptions_filter_1 = require("./common/http-exceptions.filter");
const response_interceptor_1 = require("./common/response.interceptor");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
const logger_middleware_1 = require("./common/logger.middleware");
const role_auth_guard_1 = require("./auth/role-auth.guard");
const system_module_1 = require("./system/system.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            logger_module_1.LoggerModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    return {
                        type: 'mysql',
                        host: config.get('MYSQL_HOST'),
                        port: config.get('MYSQL_PORT'),
                        username: config.get('MYSQL_USER'),
                        password: config.get('MYSQL_PASSWORD'),
                        database: config.get('MYSQL_DATABASE'),
                        entities: [__dirname + '/**/*.entity{.ts,.js}'],
                        charset: 'utf8mb4',
                        autoLoadEntities: true,
                        synchronize: true,
                    };
                },
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            system_module_1.SystemModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: http_exceptions_filter_1.HttpExceptionsFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_interceptor_1.ResponseInterceptor,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: role_auth_guard_1.RoleAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map