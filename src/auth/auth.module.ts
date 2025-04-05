import {forwardRef, Module} from '@nestjs/common';
import {UserModule} from "../user/user.module";
import {AuthService} from "./auth.service";
import {JwtStrategy} from "./jwt-strategy";

@Module({
    imports: [
        forwardRef(() => UserModule),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
