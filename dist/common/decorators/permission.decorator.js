"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowNoPermission = exports.ALLOW_NO_PERMISSION = void 0;
const common_1 = require("@nestjs/common");
exports.ALLOW_NO_PERMISSION = 'allowNoPerm';
const AllowNoPermission = () => (0, common_1.SetMetadata)(exports.ALLOW_NO_PERMISSION, true);
exports.AllowNoPermission = AllowNoPermission;
//# sourceMappingURL=permission.decorator.js.map