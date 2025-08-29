import { ReportEntity } from "./entities/report.entity";
export declare class ReportService {
    private reportRepository;
    private todoListService;
    private todoService;
    private todoRepository;
    generateDailyReport(userId: number): Promise<{
        title: string;
        content: string;
        userId: number;
    } & ReportEntity>;
    generateWeeklyReport(userId: number): Promise<import("@google/genai").GenerateContentResponse>;
    getPromptAsync(): Promise<string>;
}
