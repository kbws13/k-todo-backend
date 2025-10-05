export declare class ReportEntity {
    id: number;
    userId: number;
    title: string;
    content: string;
    type: number;
    taskIds: string;
    createTime: Date;
    updateTime: Date;
    get taskIdsAsArray(): number[];
    setTaskIds(ids: number[]): void;
}
