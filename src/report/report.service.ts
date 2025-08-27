import {Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ReportEntity} from "./entities/report.entity";
import {Repository} from "typeorm";
import {TodoListService} from "../todo-list/todo-list.service";
import {TodoService} from "../todo/todo.service";
import dayjs from "dayjs";

@Injectable()
export class ReportService {

    @InjectRepository(ReportEntity)
    private reportRepository: Repository<ReportEntity>

    @Inject(TodoListService)
    private todoListService: TodoListService;

    @Inject(TodoService)
    private todoService: TodoService;

    async getDailyReport(userId: number) {
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
}
