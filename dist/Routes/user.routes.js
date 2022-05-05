"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../Controller/user.controller");
const verifyToken_1 = require("../Middleware/verifyToken");
const router = express_1.default.Router();
router.post('/create', user_controller_1.createUser);
router.post('/login', user_controller_1.login);
router.get('/', user_controller_1.getUsers);
router.get('/home', verifyToken_1.verifyToken, user_controller_1.homepage);
router.get('/:id', user_controller_1.getUser);
router.get('/username/:username', user_controller_1.searchByUsername);
router.patch('/:id', user_controller_1.updateUser);
router.delete('/:id', user_controller_1.deleteUser);
router.patch('/reset/:id', verifyToken_1.verifyToken, user_controller_1.resetPassword);
exports.default = router;
//# sourceMappingURL=user.routes.js.map