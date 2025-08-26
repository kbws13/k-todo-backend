import { HttpService } from "@nestjs/axios";
export declare class NewsController {
    httpService: HttpService;
    private logger;
    getNews(q: string, from: string, sortBy: string, apiKey: string): Promise<any>;
}
