// src/ai/ai.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

// 可以单独抽离 token
export const GOOGLE_GEMINI = Symbol('GOOGLE_GEMINI');

@Global() // 👈 标记为全局模块，避免每个模块都要导入
@Module({
    providers: [
        {
            provide: GOOGLE_GEMINI,
            useFactory: (configService: ConfigService) => {
                const apiKey = configService.get<string>('GEMINI_API_KEY');
                if (!apiKey) {
                    throw new Error('❌ GEMINI_API_KEY is not defined in .env file!');
                }
                return new GoogleGenAI({ apiKey });
            },
            inject: [ConfigService],
        },
    ],
    exports: [GOOGLE_GEMINI], // 👈 必须导出才能被其他模块使用
})
export class GeminiModule {}