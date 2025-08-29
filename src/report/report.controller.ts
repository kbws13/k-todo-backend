import {Controller, Get, Inject, Req} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {ReportService} from "./report.service";

@Controller('report')
export class ReportController {

    constructor(private readonly reportService: ReportService) {}

    @Inject(UserService)
    private userService: UserService;

    @Get('generateDaily')
    generateDaily(@Req() req: any) {
        const userId = this.userService.verifyToken(req.headers['token'])
        return this.reportService.generateDailyReport(userId)
    }
    
    @Get('generateWeekly')
    generateWeekly(@Req() req: any) {
        const userId = this.userService.verifyToken(req.headers['token'])
        return this.reportService.generateWeeklyReport(userId)
    }
}
