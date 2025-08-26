export declare class SystemService {
    private mailService;
    private userRepository;
    sendMailForRegistry(email: string, text: string): Promise<string>;
}
