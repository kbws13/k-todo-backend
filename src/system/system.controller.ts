import {Body, Controller, Get, Inject, Post, Query} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {SystemService} from "./system.service";
import {AllowNoToken} from "../common/decorators/token.decorator";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";

@Controller('system')
export class SystemController {
    @Inject()
    private userService: UserService;

    constructor(private readonly systemService: SystemService) {}

    // 用户注册
    @Post('registry')
    @AllowNoToken()
    registry(@Body() createUserDto: CreateUserDto) {
        return this.userService.registry(createUserDto);
    }

    // 用户登录
    @Post('login')
    @AllowNoToken()
    login (@Body() loginUserDto: LoginUserDto) {
        return this.userService.login(loginUserDto);
    }

    // 发送注册邮箱验证码
    @Get('sendEmailForRegistry')
    @AllowNoToken()
    sendEmailForRegistry(@Query() dto: { email: string }) {
        return this.systemService.sendMailForRegistry(dto.email,'注册验证码');
    }
}