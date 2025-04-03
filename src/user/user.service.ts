import {Inject, Injectable} from "@nestjs/common";
import {RedisService} from "../common/redis/redis.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {DataSource, Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
import {MailService} from "../common/mail/mail.service";

@Injectable()
export class UserService {
    @Inject(RedisService)
    private redisService: RedisService;
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>;

    @Inject(JwtService)
    private jwtService: JwtService;
    @Inject(MailService)
    private mailService: MailService;
    @Inject(DataSource)
    private dataSource: DataSource;

    /**
     * 根据 ID 查找用户信息
     * @param id
     */
    async findOneById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({id});
        if(!user) return null;
        delete user.password;
        return user;
    }

    generateAccessToken(payload: Record<string, any>): string {
        return this.jwtService.sign(payload);
    }

    verifyToken(token: string): string {
        if (!token) return null;
        const id = this.jwtService.verify(token.replace('Bearer ', ''));
    }
}