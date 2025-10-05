import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoEntity } from "./entity/todo.entity";
import { CompleteTodoDto } from "./dto/complete-todo.dto";
export declare class TodoService {
    private todoRepository;
    private todoListService;
    list(todoListId: number, userId: number): Promise<TodoEntity[]>;
    add(createTodoDto: CreateTodoDto, userId: number): Promise<TodoEntity>;
    getById(id: number, userId: number): Promise<TodoEntity>;
    update(updateTodoDto: UpdateTodoDto, userId: number): Promise<{
        id: number;
        title: string;
        desc: string;
        completed: boolean;
        todoListId: number;
        remindTime: Date;
        userId: number;
        createTime: Date;
        updateTime: Date;
    } & TodoEntity>;
    delete(id: number, userId: number): Promise<import("typeorm").DeleteResult>;
    complete(completeTdoDto: CompleteTodoDto, userId: number): Promise<boolean>;
    getCompletedToday(todoListId: number, userId: number): Promise<TodoEntity[]>;
}
