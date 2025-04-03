import {AuthGuard} from "@nestjs/passport";
import {ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {UserService} from "../user/user.service";
import {ALLOW_NO_TOKEN} from "../common/decorators/token.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private reflector: Reflector,
        private userService: UserService,
    ) {
        super();
    }

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        // 接口是否允许无 token 访问
        const allowNoToken = this.reflector.getAllAndOverride<boolean>(ALLOW_NO_TOKEN, [ctx.getHandler, ctx.getClass]);
        if (allowNoToken) return true;
        // 验证用户是否登录
        const req = ctx.switchToHttp().getRequest();
        const access_token = req.get('Authorization');
        if (!access_token) throw new HttpException('未登录，请先登录', HttpStatus.UNAUTHORIZED);
        const userId = this.userService.verifyToken(access_token);
        // 判断登录是否过期
        if (!userId) throw new HttpException('登录过期，请重新登录', HttpStatus.UNAUTHORIZED);
        return super.canActivate(ctx) as Promise<boolean>;
    }
}