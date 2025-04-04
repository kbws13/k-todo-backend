import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "../user/user.service";
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private reflector;
    private userService;
    constructor(reflector: Reflector, userService: UserService);
    canActivate(ctx: ExecutionContext): Promise<boolean>;
}
export {};
