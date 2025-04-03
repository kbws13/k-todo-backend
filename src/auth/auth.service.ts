import {Inject, Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {UserEntity} from "../user/entities/user.entity";

@Injectable()
export class AuthService{
    @Inject(UserService)
    private userService: UserService;

    async validateUser(payload: {id: number}): Promise<UserEntity> {
        return await this.userService.findOneById(payload.id);
    }
}