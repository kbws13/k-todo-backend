"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowNoToken = exports.ALLOW_NO_TOKEN = void 0;
const common_1 = require("@nestjs/common");
exports.ALLOW_NO_TOKEN = 'allowNoToken';
const AllowNoToken = () => (0, common_1.SetMetadata)(exports.ALLOW_NO_TOKEN, true);
exports.AllowNoToken = AllowNoToken;
//# sourceMappingURL=token.decorator.js.map