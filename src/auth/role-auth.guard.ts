import {CanActivate, ExecutionContext, Inject, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {ALLOW_NO_TOKEN} from "../common/decorators/token.decorator";
import {ALLOW_NO_PERMISSION} from "../common/decorators/permission.decorator";
import {Logger} from "../common/logger/logger";

@Injectable()
export class RoleAuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    @Inject(Logger)
    private logger: Logger;

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        // 函数请求头配置 @AllowNoToken() 装饰器，则无需验证token权限
        const allowNoToken = this.reflector.getAllAndOverride<boolean>(
            ALLOW_NO_TOKEN,
            [ctx.getHandler(), ctx.getClass()],
        );
        this.logger.log("allowNoToken: ", String(allowNoToken))
        if (allowNoToken) return true;
        // 函数请求头配置 @AllowNoPermission() 装饰器，则无需验证权限
        const allowNoPerm = this.reflector.getAllAndOverride<boolean>(
            ALLOW_NO_PERMISSION,
            [ctx.getHandler(), ctx.getClass()],
        );
        if (allowNoPerm) return true;
        const req = ctx.switchToHttp().getRequest();
        const token = req.headers['token'];
        this.logger.log(token, 'token');
        // 没有携带 token 直接返回 false
        if (!token) return false;
        return true;
    }
}