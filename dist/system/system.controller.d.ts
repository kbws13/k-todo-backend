import { SystemService } from "./system.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
export declare class SystemController {
    private readonly systemService;
    private userService;
    constructor(systemService: SystemService);
    registry(createUserDto: CreateUserDto): Promise<{
        id: number;
        username: string;
        userRole: number;
        email: string;
        avatar: string;
        desc: string;
        createTime: Date;
        updateTime: Date;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
    sendEmailForRegistry(dto: {
        email: string;
    }): Promise<string>;
}
