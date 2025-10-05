import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import dayjs from "dayjs";
import {Transform} from "class-transformer";

@Entity('todoList')
export class TodoListEntity {
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column({type: 'varchar', length: 200, nullable: false, comment: '列表名'})
    title: string;

    @Column({type: 'varchar', length: 200, nullable: true, comment: '任务列表描述'})
    desc: string;

    @Column({type: 'int', nullable: false, comment: '用户 id'})
    userId: number;

    @Column({type: 'int', default: 0, comment: '任务总数'})
    totalCount: number;

    @Column({type: 'int', default: 0, comment: '已经完成的数量'})
    completeCount: number;

    @CreateDateColumn({type: 'timestamp', comment: '创建时间'})
    @Transform(({ value }) => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null)
    createTime: Date;

    @UpdateDateColumn({type: 'timestamp', comment: '更新时间'})
    @Transform(({ value }) => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null)
    updateTime: Date;
}