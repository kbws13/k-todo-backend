import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('todoList')
export class TodoListEntity {
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column({type: 'varchar', length: 200, comment: '列表名'})
    content: string;

    @Column({type: 'int', nullable: false, comment: '用户 id'})
    userId: number;

    @Column({type: 'int', default: 0, comment: '任务总数'})
    totalCount: number;

    @Column({type: 'int', default: 0, comment: '已经完成的数量'})
    completeCount: number;

    @CreateDateColumn({type: 'timestamp', comment: '创建时间'})
    createTime: Date;

    @UpdateDateColumn({type: 'timestamp', comment: '更新时间'})
    updateTime: Date;
}