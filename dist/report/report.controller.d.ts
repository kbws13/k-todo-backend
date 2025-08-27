import { ReportService } from "./report.service";
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    private userService;
    daily(req: any): Promise<{
        title: string;
        content: string;
        userId: number;
    } & import("./entities/report.entity").ReportEntity>;
}
