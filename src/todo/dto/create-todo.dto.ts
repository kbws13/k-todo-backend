export class CreateTodoDto {
    title: string;
    desc?: string;
    todoListId: number;
    remindTime?: Date;
}