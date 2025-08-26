import {Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {plainToClass} from "class-transformer";
import {Between, Repository} from "typeorm";
import {TodoListService} from "../todo-list/todo-list.service";
import {CreateTodoDto} from "./dto/create-todo.dto";
import {UpdateTodoDto} from "./dto/update-todo.dto";
import {TodoEntity} from "./entity/todo.entity";
import {CompleteTodoDto} from "./dto/complete-todo.dto";
import dayjs from "dayjs";

@Injectable()
export class TodoService {
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>;

    @Inject(TodoListService)
    private todoListService: TodoListService;

    async list(todoListId: number, userId: number) {
        const todos = await this.todoRepository.find({
            where: {userId, todoListId},
            order: {createTime: 'DESC'}
        });
        return {
            todos
        }
    }

    async add(createTodoDto: CreateTodoDto, userId: number) {
        const todoList = await this.todoListService.getById(createTodoDto.todoListId, userId);
        todoList.totalCount++;
        await this.todoListService.update(todoList, userId);
        const todo = plainToClass(
            TodoEntity,
            {...createTodoDto, userId},
            {ignoreDecorators: true}
        );
        return await this.todoRepository.save(todo);
    }

    async getById(id: number, userId: number) {
        return await this.todoRepository.findOne({
            where: {id, userId}
        });
    }

    async update(updateTodoDto: UpdateTodoDto, userId: number) {
        const todo = await this.todoRepository.findOne({where: {id: updateTodoDto.id, userId}});
        if (!todo) {
            throw new Error('TodoList not found');
        }
        return await this.todoRepository.save({
            ...todo,
            ...updateTodoDto,
        });
    }

    async delete(id: number, userId: number) {
        return await this.todoRepository.delete({id, userId});
    }

    async complete(completeTdoDto: CompleteTodoDto, userId: number): Promise<boolean> {
        const todo = await this.getById(completeTdoDto.todoId, userId)
        const todoList = await this.todoListService.getById(todo.todoListId, userId);
        if (todoList == null) {
            throw new Error("todoList 不存在")
        }
        todo.completed = completeTdoDto.complete;
        await this.update({...todo}, userId);
        if (completeTdoDto.complete) {
            todoList.completeCount += 1;
        } else {
            todoList.completeCount -= 1;
        }
        await this.todoListService.update({...todoList}, userId)
        return true
    }

    async getCompletedToday(todoListId: number, userId: number) {
        const startOfToday = dayjs().startOf('day').toDate()
        const endOfToday = dayjs().endOf('day').toDate()
        return this.todoRepository.find({
            where: {
                userId: userId,
                todoListId: todoListId,
                completed: true,
                updateTime: Between(startOfToday, endOfToday)
            },
            order: {
                updateTime: 'ASC',
            },
        })
    }
}