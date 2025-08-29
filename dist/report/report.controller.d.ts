import { ReportService } from "./report.service";
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    private userService;
    generateDaily(req: any): Promise<{
        title: string;
        content: string;
        userId: number;
    } & import("./entities/report.entity").ReportEntity>;
    generateWeekly(req: any): Promise<import("@google/genai").GenerateContentResponse>;
}
