import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {RedisService} from "../common/redis/redis.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {DataSource, Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
import {MailService} from "../common/mail/mail.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {getRedisKey} from "../common/utils";
import {RedisKeyPrefix} from "../common/enums/redis-key.enum";
import {compare, genSalt, hash} from 'bcryptjs';
import {plainToClass} from "class-transformer";
import {LoginUserDto} from "../system/dto/login-user.dto";

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
     * 注册
     * @param createUserDto 创建用户 Dto
     */
    async registry(createUserDto: CreateUserDto) {
        const {email} = createUserDto;
        // 判断用户是否存在
        const user = await this.userRepository
            .createQueryBuilder('su')
            .where('su.email = :email', {
                email,
            }).getOne();
        // 存在用户则报错
        if (user) {
            throw new HttpException(
                '注册邮箱已存在, 请重新输入',
                HttpStatus.EXPECTATION_FAILED,
            );
        }
        // 校验注册验证码
        const codeRedisKey = getRedisKey(RedisKeyPrefix.REGISTRY_CODE, email);
        const code = await this.redisService.get(codeRedisKey);
        if (!code || code !== createUserDto.code) {
            throw new HttpException(
                '验证码有误或已过期',
                HttpStatus.EXPECTATION_FAILED,
            );
        }
        // 哈希加密
        const salt = await genSalt();
        createUserDto.password = await hash(createUserDto.password, salt);
        const newUser = plainToClass(
            UserEntity,
            {salt, ...createUserDto},
            {ignoreDecorators: true},
        );
        // 创建用户
        const {password, salt: salter, ...rest} = await this.userRepository.save(newUser);
        return rest;
    }

    /**
     * 登录
     * @param loginUserDto
     */
    async login(loginUserDto: LoginUserDto) {
        const user = await this.userRepository.findOne({
            where: {
                email: loginUserDto.email,
            }
        });
        // 判断用户是否存在
        if (!user) {
            throw new HttpException('账号或密码错误', HttpStatus.EXPECTATION_FAILED);
        }
        // 判断密码是否存在
        const checkPassword = await compare(loginUserDto.password, user.password);
        if (!checkPassword) {
            throw new HttpException('账号或密码错误', HttpStatus.EXPECTATION_FAILED);
        }
        // 生成 Token
        const {password, salt, ...rest} = user;
        const access_token = this.generateAccessToken(rest);
        return {
            access_token
        };
    }

    /**
     * 根据 ID 查找用户信息
     * @param id
     */
    async findOneById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({id});
        if (!user) return null;
        delete user.password;
        return user;
    }

    generateAccessToken(payload: Record<string, any>): string {
        return this.jwtService.sign(payload);
    }

    verifyToken(token: string): number {
        if (!token) {
            throw new HttpException('未登录', HttpStatus.UNAUTHORIZED);
        }
        const res = this.jwtService.verify(token.replace('Bearer ', ''));
        return res.id;
    }
}