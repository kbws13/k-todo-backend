import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
export declare class RoleAuthGuard implements CanActivate {
    private readonly reflector;
    constructor(reflector: Reflector);
    private logger;
    canActivate(ctx: ExecutionContext): Promise<boolean>;
}
