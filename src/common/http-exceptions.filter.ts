import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject} from "@nestjs/common";
import {Logger} from "./logger/logger";

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
    @Inject(Logger)
    private logger: Logger;

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        const logFormat = `
##############################################################################################################
Request original url: ${request.originalUrl}
Method: ${request.method}
IP: ${request.ip}
Status code: ${status}
Response: ${
            exception.toString() +
            `（${exceptionResponse?.message || exception.message}）`
        }
##############################################################################################################
`;
        this.logger.error(logFormat, 'HttpException filter ');
        response.status(status).json({
            code: status,
            success: false,
            message: exceptionResponse?.message || exception.message,
            type: `${status >= HttpStatus.INTERNAL_SERVER_ERROR ? 'Service Error' : 'Client Error'}`,
        });
    }
}