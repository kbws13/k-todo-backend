// src/vercel.ts
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from './common/logger/logger';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';

// 创建共享的 Express 实例
const expressServer = express();

let cachedHandler: any = null;

export default async function handler(req: any, res: any) {
    // 如果已有 handler，直接复用 Express 实例
    if (!cachedHandler) {
        const nestApp = await NestFactory.create(
            AppModule,
            new ExpressAdapter(expressServer),
            {
                cors: true,
                logger: ['error', 'warn'],
                forceCloseConnections: true, // 防止连接泄漏，加快关闭
            },
        );

        const config = nestApp.get(ConfigService);
        const prefix = config.get<string>('API_PREFIX') || 'api';
        nestApp.setGlobalPrefix(prefix);
        nestApp.useLogger(nestApp.get(Logger));
        nestApp.useGlobalPipes(new ValidationPipe());

        await nestApp.init();
        cachedHandler = expressServer;
    }

    return cachedHandler(req, res);
}