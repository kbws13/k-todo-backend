"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../common/mail/mail.service");
const utils_1 = require("../common/utils");
const bcryptjs_1 = require("bcryptjs");
const class_transformer_1 = require("class-transformer");
let UserService = class UserService {
    async registry(createUserDto) {
        const { email } = createUserDto;
        const user = await this.userRepository
            .createQueryBuilder('su')
            .where('su.email = :email', {
            email,
        }).getOne();
        if (user) {
            throw new common_1.HttpException('注册邮箱已存在, 请重新输入', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        const codeRedisKey = (0, utils_1.getRedisKey)("registry_code:", email);
        const code = "123456";
        if (!code || code !== createUserDto.code) {
            throw new common_1.HttpException('验证码有误或已过期', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        const salt = await (0, bcryptjs_1.genSalt)();
        createUserDto.password = await (0, bcryptjs_1.hash)(createUserDto.password, salt);
        const newUser = (0, class_transformer_1.plainToClass)(user_entity_1.UserEntity, { salt, ...createUserDto }, { ignoreDecorators: true });
        const { password, salt: salter, ...rest } = await this.userRepository.save(newUser);
        return rest;
    }
    async login(loginUserDto) {
        const user = await this.userRepository.findOne({
            where: {
                email: loginUserDto.email,
            }
        });
        if (!user) {
            throw new common_1.HttpException('账号或密码错误', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        const checkPassword = await (0, bcryptjs_1.compare)(loginUserDto.password, user.password);
        if (!checkPassword) {
            throw new common_1.HttpException('账号或密码错误', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        const { password, salt, ...rest } = user;
        const access_token = this.generateAccessToken(rest);
        return {
            access_token
        };
    }
    async findOneById(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            return null;
        delete user.password;
        delete user.salt;
        return user;
    }
    generateAccessToken(payload) {
        return this.jwtService.sign(payload);
    }
    verifyToken(token) {
        if (!token) {
            throw new common_1.HttpException('未登录', common_1.HttpStatus.UNAUTHORIZED);
        }
        const res = this.jwtService.verify(token.replace('Bearer ', ''));
        return res.id;
    }
};
exports.UserService = UserService;
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity),
    __metadata("design:type", typeorm_2.Repository)
], UserService.prototype, "userRepository", void 0);
__decorate([
    (0, common_1.Inject)(jwt_1.JwtService),
    __metadata("design:type", jwt_1.JwtService)
], UserService.prototype, "jwtService", void 0);
__decorate([
    (0, common_1.Inject)(mail_service_1.MailService),
    __metadata("design:type", mail_service_1.MailService)
], UserService.prototype, "mailService", void 0);
__decorate([
    (0, common_1.Inject)(typeorm_2.DataSource),
    __metadata("design:type", typeorm_2.DataSource)
], UserService.prototype, "dataSource", void 0);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map