import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TodoListEntity} from "./entity/todo-list.entity";
import {Repository} from "typeorm";
import {CreateTodoListDto} from "./dto/create-todo-list.dto";
import {plainToClass} from "class-transformer";
import {UpdateTodoListDto} from "./dto/update-todo-list.dto";
import {TodoEntity} from "../todo/entity/todo.entity";
import {OverallEntity} from "./vo/OverallEntity";

@Injectable()
export class TodoListService {

    @InjectRepository(TodoListEntity)
    private todoListRepository: Repository<TodoListEntity>;

    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>;
    
    async overall(userId: number): Promise<OverallEntity> {
        const unCompletedCount = (await this.todoRepository.find({
            where: {
                userId: userId,
                completed: false,
            }
        })).length
        const completedCount = (await this.todoRepository.find({
            where: {
                userId: userId,
                completed: true,
            }
        })).length
        const progress = completedCount === 0 ? 0 : parseFloat(((completedCount / (completedCount + unCompletedCount)) * 100).toFixed(2));

        const result = new OverallEntity();
        result.completed = completedCount;
        result.unComplete = unCompletedCount;
        result.progress = progress;

        return result;
    }

    async list(userId: number): Promise<TodoListEntity[]> {
        return await this.todoListRepository.find({
            where: {userId},
            order: {createTime: 'DESC'},
        })
    }

    async add(createTodoListDto: CreateTodoListDto, userId: number) {
        const todoList = plainToClass(
            TodoListEntity,
            {...createTodoListDto, userId,},
            {ignoreDecorators: true},
        );

        return await this.todoListRepository.save(todoList);
    }

    async getById(id: number, userId: number) {
        return await this.todoListRepository.findOne({
            where: {id, userId}
        });
    }

    async update(updateTodoListDto: UpdateTodoListDto, userId: number) {
        const todoList = await this.todoListRepository.findOne({
            where: {id: updateTodoListDto.id, userId}
        });
        if (!todoList) {
            throw new Error('TodoList not found');
        }
        return await this.todoListRepository.save({
            ...todoList,
            ...updateTodoListDto,
        });
    }

    async delete(id: number, userId: number) {
        const todoList = await this.todoListRepository.findOne({where: {id, userId}})
        if (!todoList) {
            throw new Error('TodoList not found or access denied');
        }
        await this.todoRepository.delete({todoListId: id, userId: userId})
        return await this.todoListRepository.delete({id, userId});
    }
}