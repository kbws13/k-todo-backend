"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("../user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const system_service_1 = require("./system.service");
const mail_service_1 = require("../common/mail/mail.service");
const system_controller_1 = require("./system.controller");
let SystemModule = class SystemModule {
};
exports.SystemModule = SystemModule;
exports.SystemModule = SystemModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
        ],
        controllers: [system_controller_1.SystemController],
        providers: [system_service_1.SystemService, mail_service_1.MailService]
    })
], SystemModule);
//# sourceMappingURL=system.module.js.map