import { ReportEntity } from "./entities/report.entity";
import { GoogleGenAI } from "@google/genai";
export declare class ReportService {
    geminiAI: GoogleGenAI;
    private reportRepository;
    private todoListService;
    private todoService;
    private todoRepository;
    generateDailyReport(userId: number): Promise<{
        title: string;
        content: string;
        userId: number;
    } & ReportEntity>;
    generateWeeklyReport(userId: number): Promise<{
        title: string;
        content: string;
        userId: number;
        type: number;
    } & ReportEntity>;
    getPromptAsync(): Promise<string>;
}
