export declare class SystemService {
    private mailService;
    private redisService;
    private userRepository;
    sendMailForRegistry(email: string, text: string): Promise<string>;
    upload(file: Express.Multer.File, type: string): Promise<{
        url: string;
        type: string;
    }>;
}
