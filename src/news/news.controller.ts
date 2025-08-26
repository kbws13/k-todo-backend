import {Controller, Get, HttpException, HttpStatus, Inject, Query} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {lastValueFrom} from "rxjs";
import {AllowNoToken} from "../common/decorators/token.decorator";
import {Logger} from "../common/logger/logger";

@Controller('news')
export class NewsController {
    @Inject(HttpService)
    httpService: HttpService;

    @Inject(Logger)
    private logger: Logger;

    @AllowNoToken()
    @Get('everything')
    async getNews(@Query('q') q: string,
                  @Query('from') from: string,
                  @Query('sortBy') sortBy: string,
                  @Query('apiKey') apiKey: string,) {
        const url = 'https://newsapi.org/v2/everything ';
        try {
            const response = await lastValueFrom(
                this.httpService.get(url, {
                    params: {
                        q,
                        from,
                        sortBy,
                        apiKey,
                    },
                }),
            );
            this.logger.error(String(response.status), '')
            return response.data;
        } catch (error) {
            throw new HttpException(
                'Failed to fetch news',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
