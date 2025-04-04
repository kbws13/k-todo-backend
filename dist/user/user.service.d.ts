import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "../system/dto/login-user.dto";
export declare class UserService {
    private redisService;
    private userRepository;
    private jwtService;
    private mailService;
    private dataSource;
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
    findOneById(id: number): Promise<UserEntity>;
    generateAccessToken(payload: Record<string, any>): string;
    verifyToken(token: string): string;
}
