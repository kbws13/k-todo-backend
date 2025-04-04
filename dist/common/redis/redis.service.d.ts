import { RedisClientType } from 'redis';
export declare class RedisService {
    private client;
    getClient(): RedisClientType;
    get(redisKey: string): Promise<string>;
    set(redisKey: string, value: string | number, seconds?: number): Promise<string>;
    hSet(redisKey: string, value: Record<string, string | number | boolean | Date>): Promise<number>;
    hGetAll(redisKey: string): Promise<Record<string, string>>;
    del(redisKey: string): Promise<number>;
}
