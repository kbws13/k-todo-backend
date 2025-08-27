import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Transform} from "class-transformer";
import dayjs from "dayjs";

@Entity('report')
export class ReportEntity {
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;
    
    @Column({type: 'int', nullable: false, comment: '用户 id'})
    userId: number;
    
    @Column({type: 'varchar', length: 255, nullable: false, comment: '日报标题'})
    title: string;
    
    @Column({type: 'text', nullable: false, comment: '日报内容'})
    content: string;
    
    @Column({type: 'int', nullable: false, default: 0, comment: '0:日报 1:周报'})
    type: number;

    @CreateDateColumn({type: 'timestamp', comment: '创建时间'})
    @Transform(({ value }) => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null)
    createTime: Date;

    @UpdateDateColumn({type: 'timestamp', comment: '更新时间'})
    @Transform(({ value }) => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null)
    updateTime: Date;
}