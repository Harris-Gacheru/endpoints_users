"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.LoginSchema = joi_1.default.object({
    username: joi_1.default.string().required().max(20),
    password: joi_1.default.string().required()
});
//# sourceMappingURL=loginValidator.js.map