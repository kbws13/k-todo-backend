import {NestFactory} from '@nestjs/core';
import {ExpressAdapter} from '@nestjs/platform-express';
import {AppModule} from './app.module';
import {ConfigService} from '@nestjs/config';
import {Logger} from './common/logger/logger';
import {ValidationPipe} from '@nestjs/common';
import express from 'express';

const server = express();

async function createNestApp() {
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(server),
        {
            cors: true,
            logger: ['error', 'warn'],
        }
    );

    const config = app.get(ConfigService);
    const prefix = config.get<string>('API_PREFIX');
    app.setGlobalPrefix(prefix);
    app.useLogger(app.get(Logger));
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
    return app;
}

let app: any;

// Vercel serverless 函数入口
export default async (req: any, res: any) => {
    if (!app) {
        app = await createNestApp();
    }
    return server(req, res);
};

// 本地开发时的启动函数
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
        logger: ['error', 'warn'],
    });
    const config = app.get(ConfigService);
    const prefix = config.get<string>('API_PREFIX');
    app.setGlobalPrefix(prefix);
    app.useLogger(app.get(Logger));
    app.useGlobalPipes(new ValidationPipe());
    console.log('APP_PORT', config.get<number>('APP_PORT'));
    await app.listen(config.get<number>('APP_PORT') || 3000);
}

// 只在直接运行时启动（非 Vercel 环境）
if (require.main === module) {
    bootstrap();
}