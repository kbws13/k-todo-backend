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
exports.RoleAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const token_decorator_1 = require("../common/decorators/token.decorator");
const permission_decorator_1 = require("../common/decorators/permission.decorator");
const logger_1 = require("../common/logger/logger");
let RoleAuthGuard = class RoleAuthGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(ctx) {
        const allowNoToken = this.reflector.getAllAndOverride(token_decorator_1.ALLOW_NO_TOKEN, [ctx.getHandler(), ctx.getClass()]);
        this.logger.log("allowNoToken: ", String(allowNoToken));
        if (allowNoToken)
            return true;
        const allowNoPerm = this.reflector.getAllAndOverride(permission_decorator_1.ALLOW_NO_PERMISSION, [ctx.getHandler(), ctx.getClass()]);
        if (allowNoPerm)
            return true;
        const req = ctx.switchToHttp().getRequest();
        const token = req.headers['token'];
        this.logger.log(token, 'token');
        if (!token)
            return false;
        return true;
    }
};
exports.RoleAuthGuard = RoleAuthGuard;
__decorate([
    (0, common_1.Inject)(logger_1.Logger),
    __metadata("design:type", logger_1.Logger)
], RoleAuthGuard.prototype, "logger", void 0);
exports.RoleAuthGuard = RoleAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RoleAuthGuard);
//# sourceMappingURL=role-auth.guard.js.map