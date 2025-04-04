import { ConfigService } from "@nestjs/config";
import { UserEntity } from "../user/entities/user.entity";
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(configService: ConfigService);
    validate(payload: UserEntity): Promise<UserEntity>;
}
export {};
