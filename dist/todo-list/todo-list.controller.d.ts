import { TodoListService } from "./todo-list.service";
import { CreateTodoListDto } from "./dto/create-todo-list.dto";
import { UpdateTodoListDto } from "./dto/update-todo-list.dto";
export declare class TodoListController {
    private readonly todoListService;
    constructor(todoListService: TodoListService);
    private userService;
    list(req: any): Promise<{
        todoList: import("./entity/todo-list.entity").TodoListEntity[];
    }>;
    add(req: any, createTodoListDto: CreateTodoListDto): Promise<import("./entity/todo-list.entity").TodoListEntity>;
    getById(id: number): Promise<import("./entity/todo-list.entity").TodoListEntity>;
    update(todoListUpdateDto: UpdateTodoListDto): Promise<{
        id: number;
        content: string;
        userId: number;
        totalCount: number;
        completeCount: number;
        createTime: Date;
        updateTime: Date;
    } & import("./entity/todo-list.entity").TodoListEntity>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
