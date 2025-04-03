import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import {PassportStrategy} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {ConfigService} from "@nestjs/config";
import {UserEntity} from "../user/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    @Inject(AuthService)
    private authService: AuthService;

    // 注入配置服务
    constructor(configService: ConfigService) {
        super({
            // 从 header 中的 Authorization 的 Bearer 表头中获取 token 值
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // 不忽视token过期的情况，过期会返回401
            ignoreExpiration: false,
            // 读取配置中的secret
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: UserEntity) {
        const user = await this.authService.validateUser(payload);
        if(!user) {
            throw new HttpException('账号不存在', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}