import { TodoListEntity } from "./entity/todo-list.entity";
import { CreateTodoListDto } from "./dto/create-todo-list.dto";
import { UpdateTodoListDto } from "./dto/update-todo-list.dto";
export declare class TodoListService {
    private todoListRepository;
    private logger;
    list(userId: number): Promise<{
        todoList: TodoListEntity[];
    }>;
    add(createTodoListDto: CreateTodoListDto, userId: number): Promise<TodoListEntity>;
    getById(id: number): Promise<TodoListEntity>;
    update(updateTodoListDto: UpdateTodoListDto): Promise<{
        id: number;
        content: string;
        userId: number;
        totalCount: number;
        completeCount: number;
        createTime: Date;
        updateTime: Date;
    } & TodoListEntity>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
