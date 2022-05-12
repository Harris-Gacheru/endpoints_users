"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RegisterSchema = joi_1.default.object({
    username: joi_1.default.string().required().max(20),
    fullname: joi_1.default.string().required().max(30),
    email: joi_1.default.string().required().email(),
    age: joi_1.default.number().required(),
    roles: joi_1.default.string(),
    password: joi_1.default.string().required().min(6).max(30)
});
//# sourceMappingURL=registerValidator.js.map