import {Body, Controller, Get, Inject, Param, Post, Req} from "@nestjs/common";
import {TodoService} from "./todo.service";
import {UserService} from "../user/user.service";
import {CreateTodoDto} from "./dto/create-todo.dto";
import {UpdateTodoDto} from "./dto/update-todo.dto";
import {CompleteTodoDto} from "./dto/complete-todo.dto";

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Inject(UserService)
    private userService: UserService;

    @Get('list/:id')
    list(@Param('id') id: number, @Req() req: any) {
        const userId = this.userService.verifyToken(req.headers['token'])
        return this.todoService.list(id, userId);
    }

    @Post('add')
    add(@Body() createTodoDto: CreateTodoDto, @Req() req: any) {
        const userId = this.userService.verifyToken(req.headers['token'])
        return this.todoService.add(createTodoDto, userId);
    }

    @Get("getById/:id")
    getById(@Param('id') id: number, @Req() req: any) {
        const userId = this.userService.verifyToken(req.headers['token'])
        return this.todoService.getById(id, userId);
    }

    @Post('update')
    update(@Body() updateTodoDto: UpdateTodoDto, @Req() req: any) {
        const userId = this.userService.verifyToken(req.headers['token'])
        return this.todoService.update(updateTodoDto, userId);
    }

    @Get('delete')
    delete(@Param('id') id: number, @Req() req: any) {
        const userId = this.userService.verifyToken(req.headers['token'])
        return this.todoService.delete(id, userId);
    }
    
    @Post('complete')
    complete(@Body() completeTodoDto: CompleteTodoDto, @Req() req: any) {
        const userId = this.userService.verifyToken(req.headers['token'])
        return this.todoService.complete(completeTodoDto, userId)
    }
    
    @Get('todayCompleted/:id')
    todayCompleted(@Param('id') id: number, @Req() req: any) {
        const userId = this.userService.verifyToken(req.headers['token'])
        return this.todoService.getCompletedToday(id, userId)
    }
}