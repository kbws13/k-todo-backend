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
exports.JwtAuthGuard = void 0;
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const user_service_1 = require("../user/user.service");
const token_decorator_1 = require("../common/decorators/token.decorator");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector, userService) {
        super();
        this.reflector = reflector;
        this.userService = userService;
    }
    async canActivate(ctx) {
        const allowNoToken = this.reflector.getAllAndOverride(token_decorator_1.ALLOW_NO_TOKEN, [ctx.getHandler(), ctx.getClass(),]);
        if (allowNoToken)
            return true;
        const req = ctx.switchToHttp().getRequest();
        const token = req.headers['token'];
        if (!token)
            throw new common_1.HttpException('未登录，请先登录', common_1.HttpStatus.UNAUTHORIZED);
        const userId = this.userService.verifyToken(token);
        if (!userId)
            throw new common_1.HttpException('登录过期，请重新登录', common_1.HttpStatus.UNAUTHORIZED);
        return true;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        user_service_1.UserService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map