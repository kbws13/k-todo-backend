import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TodoEntity} from "./emtity/todo.entity";
import {Repository} from "typeorm";
import {CreateTodoDto} from "./dto/create-todo.dto";
import {plainToClass} from "class-transformer";
import {UpdateTodoDto} from "./dto/update-todo.dto";

@Injectable()
export class TodoService {
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>;

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
        const todo = plainToClass(
            TodoEntity,
            { ...createTodoDto, userId },
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
        const todo = await this.todoRepository.findOne({ where: { id: updateTodoDto.id, userId } });
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
}