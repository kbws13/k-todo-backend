import {Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ReportEntity} from "./entities/report.entity";
import {Raw, Repository} from "typeorm";
import {TodoListService} from "../todo-list/todo-list.service";
import {TodoService} from "../todo/todo.service";
import dayjs from "dayjs";
import {TodoEntity} from "../todo/entity/todo.entity";
import {GoogleGenAI} from "@google/genai";
import * as path from "node:path";
import * as fs from "node:fs";
import {GOOGLE_GEMINI} from "../gemini/gemini.module";


@Injectable()
export class ReportService {

    @Inject(GOOGLE_GEMINI)
    geminiAI: GoogleGenAI

    @InjectRepository(ReportEntity)
    private reportRepository: Repository<ReportEntity>

    @Inject(TodoListService)
    private todoListService: TodoListService;

    @Inject(TodoService)
    private todoService: TodoService;

    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>

    async generateDailyReport(userId: number) {
        const todoLists = await this.todoListService.list(userId)
        let markdown = ''
        for (const list of todoLists) {
            const todos = await this.todoService.getCompletedToday(list.id, userId)
            if (todos.length > 0) {
                markdown += `## ${list.content}:\n`
                markdown += todos.map(item => `- ${item.content}\n`)
            }
        }
        return await this.reportRepository.save({
            title: dayjs().format('YYYY-MM-DD'),
            content: markdown,
            userId: userId,
        })
    }

    async generateWeeklyReport(userId: number) {
        const now = new Date();

        // 获取本周一（将时间设为 00:00:00）
        // 0 (Sunday) 到 6 (Saturday)
        const dayOfWeek = now.getDay();
        const diffToMonday = now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // 如果是周日，则往前推6天
        const monday = new Date(now);
        monday.setDate(diffToMonday);
        monday.setHours(0, 0, 0, 0);

        // 获取下周一（作为结束时间）
        const nextMonday = new Date(monday);
        nextMonday.setDate(monday.getDate() + 7);

        const reportList = await this.reportRepository.find({
            where: {
                userId,
                createTime: Raw(
                    (columnAlias) => `${columnAlias} >= :monday AND ${columnAlias} < :nextMonday`,
                    {monday, nextMonday}
                ),
            },
            order: {
                createTime: 'ASC',
            },
        });
        const prompt = await this.getPromptAsync();
        const res = await this.geminiAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: JSON.stringify(reportList),
            config: {
                systemInstruction: prompt,
                thinkingConfig: {
                    thinkingBudget: 0
                }
            }
        })
        const formatDate = (d: Date): string => {
            const month = d.getMonth() + 1;
            const day = d.getDate();
            return `${month}.${day}`;
        };

        console.log(`${formatDate(monday)}-${formatDate(nextMonday)}`)

        return await this.reportRepository.save({
            title: `${formatDate(monday)}-${formatDate(nextMonday)}`,
            content: res.text,
            userId: userId,
            type: 1,
        })
    }

    async getPromptAsync(): Promise<string> {
        const filePath = path.join(process.cwd(), 'prompt.txt');
        return await fs.promises.readFile(filePath, 'utf-8');
    }
}
