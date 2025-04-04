"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const redis_module_1 = require("../common/redis/redis.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const auth_module_1 = require("../auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const mail_service_1 = require("../common/mail/mail.service");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            redis_module_1.RedisModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            jwt_1.JwtModule.registerAsync({
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRE_TIME')
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, mail_service_1.MailService],
        exports: [user_service_1.UserService]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map