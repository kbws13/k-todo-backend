import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {MailService} from "../common/mail/mail.service";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        forwardRef(() => AuthModule),
        // 新增jwt模块
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => (
                {
                    // 读取配置中的secret
                    secret: configService.get<string>('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get<string>('JWT_EXPIRE_TIME')
                    },
                }
            ),
            // 将 ConfigService 注入到工厂函数中
            inject: [ConfigService],
        }),
    ],
    controllers: [UserController],
    providers: [UserService, MailService],
    exports: [UserService]
})
export class UserModule {}
