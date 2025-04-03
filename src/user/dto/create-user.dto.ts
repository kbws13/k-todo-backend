import {IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: '用户名不能为空'})
    @IsString({message: '必须是字符串'})
    username: string;

    @IsNotEmpty({message: '密码不能为空'})
    @IsString({message: '必须是字符串'})
    password: string;

    @IsNotEmpty({message: '确认密码不能为空'})
    confirmPassword: string;

    @IsNotEmpty({message: '邮箱不能为空'})
    @IsString({message: '必须是字符串'})
    email: string;

    @IsNotEmpty({message: '验证码不能为空'})
    code: string;
}