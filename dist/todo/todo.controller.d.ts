import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    private userService;
    list(id: number, req: any): Promise<{
        todos: import("./emtity/todo.entity").TodoEntity[];
    }>;
    add(createTodoDto: CreateTodoDto, req: any): Promise<import("./emtity/todo.entity").TodoEntity>;
    getById(id: number, req: any): Promise<import("./emtity/todo.entity").TodoEntity>;
    update(updateTodoDto: UpdateTodoDto, req: any): Promise<{
        id: number;
        content: string;
        desc: string;
        completed: boolean;
        todoListId: number;
        remindTime: Date;
        userId: number;
        createTime: Date;
        updateTime: Date;
    } & import("./emtity/todo.entity").TodoEntity>;
    delete(id: number, req: any): Promise<import("typeorm").DeleteResult>;
}
