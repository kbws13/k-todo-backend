import { ReportEntity } from "./entities/report.entity";
export declare class ReportService {
    private reportRepository;
    private todoListService;
    private todoService;
    getDailyReport(userId: number): Promise<{
        title: string;
        content: string;
        userId: number;
    } & ReportEntity>;
}
