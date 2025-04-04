import { ConfigService } from "@nestjs/config";
export declare class MailService {
    private config;
    private transporter;
    constructor(config: ConfigService);
    sendMail(email: string, subject: string, html?: string): Promise<Record<string, string>>;
}
