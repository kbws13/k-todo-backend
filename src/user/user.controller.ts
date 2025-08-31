import {Controller, Get, Req} from "@nestjs/common";
import {UserService} from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("currentUser")
    async currentUser(@Req() req: any) {
        const userId = this.userService.verifyToken(req.headers['token'])
        return this.userService.findOneById(userId)
    }
}