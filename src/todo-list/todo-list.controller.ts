import {Body, Controller, Get, Inject, Param, Post, Req} from "@nestjs/common";
import {TodoListService} from "./todo-list.service";
import {UserService} from "../user/user.service";
import {CreateTodoListDto} from "./dto/create-todo-list.dto";
import {UpdateTodoListDto} from "./dto/update-todo-list.dto";

@Controller('todoList')
export class TodoListController {
    constructor(private readonly  todoListService: TodoListService) {}

    @Inject(UserService)
    private userService: UserService;

    @Get('list')
    list(@Req() req: any) {
        const userId = this.userService.verifyToken(req.headers['token'])
        return this.todoListService.list(userId)
    }

    @Post('add')
    add(@Req() req: any, @Body() createTodoListDto: CreateTodoListDto) {
        const userId = this.userService.verifyToken(req.headers['token']);
        return this.todoListService.add(createTodoListDto, userId);
    }

    @Get('getById/:id')
    getById(@Param('id') id: number) {
        return this.todoListService.getById(id);
    }

    @Post('update')
    update(@Body() todoListUpdateDto: UpdateTodoListDto) {
        return this.todoListService.update(todoListUpdateDto);
    }

    @Post('delete')
    delete(@Param('id') id: number) {
        return this.todoListService.delete(id);
    }
}