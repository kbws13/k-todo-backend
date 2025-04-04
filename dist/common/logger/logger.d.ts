import { LoggerService } from "@nestjs/common";
import 'winston-daily-rotate-file';
export declare class Logger implements LoggerService {
    private logger;
    constructor();
    log(message: string, context: string): void;
    info(message: string, context: string): void;
    error(message: string, context: string): void;
    warn(message: string, context: string): void;
}
