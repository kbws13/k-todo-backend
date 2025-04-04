import { RedisKeyPrefix } from "../enums/redis-key.enum";
export declare function getRedisKey(moduleKey: RedisKeyPrefix, id?: number | string): string;
