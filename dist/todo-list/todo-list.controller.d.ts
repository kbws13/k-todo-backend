import { TodoListService } from "./todo-list.service";
import { CreateTodoListDto } from "./dto/create-todo-list.dto";
import { UpdateTodoListDto } from "./dto/update-todo-list.dto";
export declare class TodoListController {
    private readonly todoListService;
    constructor(todoListService: TodoListService);
    private userService;
    list(req: any): Promise<import("./entity/todo-list.entity").TodoListEntity[]>;
    add(req: any, createTodoListDto: CreateTodoListDto): Promise<import("./entity/todo-list.entity").TodoListEntity>;
    getById(id: number, req: any): Promise<import("./entity/todo-list.entity").TodoListEntity>;
    update(todoListUpdateDto: UpdateTodoListDto, req: any): Promise<{
        id: number;
        content: string;
        desc: string;
        userId: number;
        totalCount: number;
        completeCount: number;
        createTime: Date;
        updateTime: Date;
    } & import("./entity/todo-list.entity").TodoListEntity>;
    delete(id: number, req: any): Promise<import("typeorm").DeleteResult>;
    overall(req: any): Promise<import("./vo/OverallEntity").OverallEntity>;
}
