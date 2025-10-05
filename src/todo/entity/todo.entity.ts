import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import dayjs from 'dayjs';
import {Transform} from "class-transformer";

@Entity('todo')
export class TodoEntity {
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column({type: 'text', nullable: false, comment: '任务名'})
    title: string;

    @Column({type: 'text', nullable: true, comment: '备注'})
    desc: string;

    @Column({type: 'int', nullable: false, comment: 'todoList id'})
    todoListId: number;

    @Column({type: 'boolean', nullable: false, default: false, comment: '0 未完成 1 已完成'})
    completed: boolean;

    @Column({type: 'timestamp', nullable: true, comment: '提醒时间'})
    @Transform(({ value }) => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null)
    remindTime: Date;

    @Column({type: 'int', nullable: false, comment: '用户 id'})
    userId: number;

    @CreateDateColumn({type: 'timestamp', comment: '创建时间'})
    @Transform(({ value }) => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null)
    createTime: Date;

    @UpdateDateColumn({type: 'timestamp', comment: '更新时间'})
    @Transform(({ value }) => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null)
    updateTime: Date;
}