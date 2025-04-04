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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const system_service_1 = require("./system.service");
const token_decorator_1 = require("../common/decorators/token.decorator");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const platform_express_1 = require("@nestjs/platform-express");
let SystemController = class SystemController {
    constructor(systemService) {
        this.systemService = systemService;
    }
    registry(createUserDto) {
        return this.userService.registry(createUserDto);
    }
    login(loginUserDto) {
        return this.userService.login(loginUserDto);
    }
    sendEmailForRegistry(dto) {
        return this.systemService.sendMailForRegistry(dto.email, '注册验证码');
    }
    uploadFile(file, data) {
        return this.systemService.upload(file, data.type);
    }
};
exports.SystemController = SystemController;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", user_service_1.UserService)
], SystemController.prototype, "userService", void 0);
__decorate([
    (0, common_1.Post)('registry'),
    (0, token_decorator_1.AllowNoToken)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], SystemController.prototype, "registry", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, token_decorator_1.AllowNoToken)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], SystemController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('sendEmailForRegistry'),
    (0, token_decorator_1.AllowNoToken)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SystemController.prototype, "sendEmailForRegistry", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SystemController.prototype, "uploadFile", null);
exports.SystemController = SystemController = __decorate([
    (0, common_1.Controller)('system'),
    __metadata("design:paramtypes", [system_service_1.SystemService])
], SystemController);
//# sourceMappingURL=system.controller.js.map