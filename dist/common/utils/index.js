"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisKey = getRedisKey;
function getRedisKey(moduleKey, id) {
    return `${moduleKey}${id || ''}`;
}
//# sourceMappingURL=index.js.map