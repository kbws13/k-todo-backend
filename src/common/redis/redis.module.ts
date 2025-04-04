import {ConfigService} from "@nestjs/config";
import {createClient} from "redis";
import {Global, Module} from "@nestjs/common";
import {RedisService} from "./redis.service";

const createRedisClient = async (config: ConfigService) => {
    return await createClient({
        socket: {
            host: config.get<string>("REDIS_HOST"),
            port: config.get<number>('REDIS_PORT'),
        },
        password: config.get<string>('REDIS_PASSWORD'),
    }).connect();
}

@Global()
@Module({
    providers: [
        {
            provide: 'NEST_REDIS',
            inject: [ConfigService],
            useFactory: createRedisClient,
        },
        RedisService,
    ],
    exports: ['NEST_REDIS', RedisService],
})
export class RedisModule {}