import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    currentUser(req: any): Promise<import("./entities/user.entity").UserEntity>;
}
