import {Inject, Injectable} from "@nestjs/common";
import {MailService} from "../common/mail/mail.service";
import {RedisService} from "../common/redis/redis.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {getRedisKey} from "../common/utils";
import {RedisKeyPrefix} from "../common/enums/redis-key.enum";

@Injectable()
export class SystemService {
    @Inject()
    private mailService: MailService;

    @Inject(RedisService)
    private redisService: RedisService;

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>;

    /**
     * 发送注册邮件验证码
     *
     * @param email 邮箱地址
     * @param text 邮件内容
     * @returns 返回发送成功信息
     */
    async sendMailForRegistry(email: string, text: string) {
        const { code } = await this.mailService.sendMail(email, text)
        // 缓存Redis
        const redisKey = getRedisKey(RedisKeyPrefix.REGISTRY_CODE, email);
        await this.redisService.set(redisKey, code, 60*5);
        return '发送成功';
    }
}