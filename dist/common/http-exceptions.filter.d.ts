import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
export declare class HttpExceptionsFilter implements ExceptionFilter {
    private logger;
    catch(exception: any, host: ArgumentsHost): void;
}
