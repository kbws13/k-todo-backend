import { Module } from '@nestjs/common';
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../user/entities/user.entity";
import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import { extname } from 'path';
import {SystemService} from "./system.service";
import {MailService} from "../common/mail/mail.service";
import {SystemController} from "./system.controller";

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([UserEntity]),
        MulterModule.register({
            // 定义存储引擎
            storage: diskStorage({
                // 定义文件存储的目录
                destination: './uploads',
                filename: (_, file, cb) => {
                    // 创建随机文件名
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                },
            }),
        }),
    ],
    controllers: [SystemController],
    providers: [SystemService, MailService]
})
export class SystemModule {}
