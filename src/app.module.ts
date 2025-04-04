import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {LoggerModule} from "./common/logger/logger.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {APP_FILTER, APP_GUARD, APP_INTERCEPTOR} from "@nestjs/core";
import {HttpExceptionsFilter} from "./common/http-exceptions.filter";
import {ResponseInterceptor} from "./common/response.interceptor";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {LoggerMiddleware} from "./common/logger.middleware";
import {RoleAuthGuard} from "./auth/role-auth.guard";

@Module({
    imports: [
        AuthModule,
        UserModule,
        LoggerModule,
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    type: 'mysql',
                    host: config.get<string>('MYSQL_HOST'),
                    port: config.get<number>('MYSQL_PORT'),
                    username: config.get<string>('MYSQL_USER'),
                    password: config.get<string>('MYSQL_PASSWORD'),
                    database: config.get<string>('MYSQL_DATABASE'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    charset: 'utf8mb4',
                    autoLoadEntities: true,
                    // 生产环境中禁止开启，应该使用数据迁移
                    synchronize: true,
                };
            },
        }),
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        })
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // 应用过滤器
        {
            provide: APP_FILTER,
            useClass: HttpExceptionsFilter,
        },
        // 应用拦截器
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        // 应用jwt登录态验证守卫
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        // 应用接口权限验证守卫
        {
            provide: APP_GUARD,
            useClass: RoleAuthGuard,
        },
    ],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
