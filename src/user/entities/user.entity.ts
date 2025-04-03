import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column({type: 'varchar', length: 32, comment: '用户名'})
    username: string;

    @Column({type: 'string', length: 200, comment: '用户密码'})
    password: string;

    @Column({ type: 'int', comment: '用户类型 0 管理员 1 普通用户', default: 1 })
    userType: number;

    @Column({ type: 'varchar', comment: '用户邮箱', default: ''})
    email: string;

    @Column({ type: 'varchar', comment: '用户头像', default: ''})
    avatar: string;

    @Column({ type: 'varchar', comment: '用户备注', default: ''})
    desc: string;

    @CreateDateColumn({type: 'timestamp', comment: '创建时间'})
    createTime: Date;

    @UpdateDateColumn({type: 'timestamp', comment: '更新时间'})
    updateTime: Date;
}