export class CreateTodoDto {
    content: string;
    desc?: string;
    todoListId: number;
    remindTime?: Date;
}