import { ReportService } from "./report.service";
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    private userService;
    list(req: any): Promise<import("./entities/report.entity").ReportEntity[]>;
    generateDaily(req: any): Promise<{
        title: string;
        content: string;
        userId: number;
        type: number;
        taskIds: string;
    } & import("./entities/report.entity").ReportEntity>;
    generateWeekly(req: any): Promise<{
        title: string;
        content: string;
        userId: number;
        type: number;
    } & import("./entities/report.entity").ReportEntity>;
}
