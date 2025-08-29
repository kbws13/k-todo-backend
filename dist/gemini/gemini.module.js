"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiModule = exports.GOOGLE_GEMINI = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const genai_1 = require("@google/genai");
exports.GOOGLE_GEMINI = Symbol('GOOGLE_GEMINI');
let GeminiModule = class GeminiModule {
};
exports.GeminiModule = GeminiModule;
exports.GeminiModule = GeminiModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: exports.GOOGLE_GEMINI,
                useFactory: (configService) => {
                    const apiKey = configService.get('GEMINI_API_KEY');
                    if (!apiKey) {
                        throw new Error('❌ GEMINI_API_KEY is not defined in .env file!');
                    }
                    return new genai_1.GoogleGenAI({ apiKey });
                },
                inject: [config_1.ConfigService],
            },
        ],
        exports: [exports.GOOGLE_GEMINI],
    })
], GeminiModule);
//# sourceMappingURL=gemini.module.js.map