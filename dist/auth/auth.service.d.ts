import { UserEntity } from "../user/entities/user.entity";
export declare class AuthService {
    private userService;
    validateUser(payload: {
        id: number;
    }): Promise<UserEntity>;
}
