import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from './logger/logger';
export declare class ResponseInterceptor implements NestInterceptor {
    private readonly logger;
    constructor(logger: Logger);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
