import {Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TodoListEntity} from "./entity/todo-list.entity";
import {Repository} from "typeorm";
import {CreateTodoListDto} from "./dto/create-todo-list.dto";
import {plainToClass} from "class-transformer";
import {Logger} from "../common/logger/logger";
import {UpdateTodoListDto} from "./dto/update-todo-list.dto";

@Injectable()
export class TodoListService {

    @InjectRepository(TodoListEntity)
    private todoListRepository: Repository<TodoListEntity>;

    @Inject(Logger)
    private logger: Logger;

    async list(userId: number) {
        const todoList = await this.todoListRepository.find({
            where: {userId},
            order: {createTime: 'DESC'},
        });
        return {
            todoList
        }
    }

    async add(createTodoListDto: CreateTodoListDto, userId: number) {
        const todoList = plainToClass(
            TodoListEntity,
            { ...createTodoListDto, userId,},
            {ignoreDecorators: true},
        );

        const res = await this.todoListRepository.save(todoList);
        return res;
    }

    async getById(id: number) {
        return await this.todoListRepository.findOne({
            where: {id}
        });
    }

    async update(updateTodoListDto: UpdateTodoListDto) {
        const todoList = await this.todoListRepository.findOne({ where: { id: updateTodoListDto.id } });
        if (!todoList) {
            throw new Error('TodoList not found');
        }
        return await this.todoListRepository.save({
            ...todoList,
            ...updateTodoListDto,
        });
    }

    async delete(id: number) {
        return await this.todoListRepository.delete(id);
    }
}