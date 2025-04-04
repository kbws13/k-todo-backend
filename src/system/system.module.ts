import {Module} from '@nestjs/common';
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../user/entities/user.entity";
import {SystemService} from "./system.service";
import {MailService} from "../common/mail/mail.service";
import {SystemController} from "./system.controller";

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [SystemController],
    providers: [SystemService, MailService]
})
export class SystemModule {}
