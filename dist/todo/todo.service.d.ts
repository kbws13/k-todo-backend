import { TodoEntity } from "./emtity/todo.entity";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
export declare class TodoService {
    private todoRepository;
    list(todoListId: number, userId: number): Promise<{
        todos: TodoEntity[];
    }>;
    add(createTodoDto: CreateTodoDto, userId: number): Promise<TodoEntity>;
    getById(id: number): Promise<TodoEntity>;
    update(updateTodoDto: UpdateTodoDto): Promise<{
        id: number;
        content: string;
        desc: string;
        completed: boolean;
        todoListId: number;
        remindTime: Date;
        userId: number;
        createTime: Date;
        updateTime: Date;
    } & TodoEntity>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
