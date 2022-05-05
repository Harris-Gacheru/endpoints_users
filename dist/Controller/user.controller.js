"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homepage = exports.login = exports.resetPassword = exports.searchByUsername = exports.updateUser = exports.deleteUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = __importDefault(require("../Config/config"));
const registerValidator_1 = require("../Helpers/registerValidator");
const loginValidator_1 = require("../Helpers/loginValidator");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, fullname, email, age, roles, password } = req.body;
        const { error } = registerValidator_1.RegisterSchema.validate(req.body);
        if (error) {
            return res.json({ Error: error });
        }
        else {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            let pool = yield mssql_1.default.connect(config_1.default);
            yield pool.request()
                .input('username', mssql_1.default.VarChar, username)
                .input('fullname', mssql_1.default.VarChar, fullname)
                .input('email', mssql_1.default.VarChar, email)
                .input('age', mssql_1.default.Int, age)
                .input('roles', mssql_1.default.VarChar, roles)
                .input('password', mssql_1.default.VarChar, hashedPassword)
                .execute('createUser');
            res.json({ message: 'User created successfully' });
        }
    }
    catch (error) {
        res.json({ Error: error.message });
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config_1.default);
        const users = yield pool.request().execute('getUsers');
        res.json(users.recordset);
    }
    catch (error) {
        res.json({ Error: error.message });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        let user = yield pool.request()
            .input('id', mssql_1.default.Int, id)
            .execute('getUser');
        if (!user.recordset[0]) {
            res.json({ message: `User with id ${id} does not exist` });
        }
        else {
            res.json(user.recordset);
        }
    }
    catch (error) {
        res.json({ Error: error.message });
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const user = yield pool.request()
            .input('id', mssql_1.default.Int, id)
            .execute('getUser');
        if (!user.recordset[0]) {
            res.json({ message: `User with id ${id} does not exist` });
        }
        else {
            yield pool.request()
                .input('id', mssql_1.default.Int, id)
                .execute('deleteUser');
            res.json({ message: `User deleted successfully` });
        }
    }
    catch (error) {
        res.json({ Error: error.message });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { username, fullname, email, age, roles } = req.body;
        let pool = yield mssql_1.default.connect(config_1.default);
        const user = yield pool.request()
            .input('id', mssql_1.default.Int, id)
            .execute('getUser');
        if (!user.recordset[0]) {
            res.json({ message: `User with id ${id} does not exist` });
        }
        else {
            yield pool.request()
                .input('id', mssql_1.default.Int, id)
                .input('username', mssql_1.default.VarChar, username)
                .input('fullname', mssql_1.default.VarChar, fullname)
                .input('email', mssql_1.default.VarChar, email)
                .input('age', mssql_1.default.Int, age)
                .input('roles', mssql_1.default.VarChar, roles)
                .execute('updateUser');
            res.json({ message: `User updated successfully` });
        }
    }
    catch (error) {
        res.json({ Error: error.message });
    }
});
exports.updateUser = updateUser;
const searchByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        let pool = yield mssql_1.default.connect(config_1.default);
        let user = yield pool.request()
            .input('username', mssql_1.default.VarChar, username)
            .execute('searchByUsername');
        if (!user.recordset[0]) {
            res.json({ message: `User with username ${username} does not exist` });
        }
        else {
            res.json(user.recordset);
        }
    }
    catch (error) {
        res.json({ Error: error.message });
    }
});
exports.searchByUsername = searchByUsername;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const password = req.body.password;
        let pool = yield mssql_1.default.connect(config_1.default);
        const user = yield pool.request()
            .input('id', mssql_1.default.Int, id)
            .execute('getUser');
        if (!user.recordset[0]) {
            res.json({ message: `User with id ${id} does not exist` });
        }
        else {
            yield pool.request()
                .input('id', mssql_1.default.Int, id)
                .input('password', mssql_1.default.VarChar, password)
                .execute('resetPassword');
            res.json({ message: `Password updated successfully` });
        }
    }
    catch (error) {
        res.json({ Error: error.message });
    }
});
exports.resetPassword = resetPassword;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const { error } = loginValidator_1.LoginSchema.validate(req.body);
        if (error) {
            return res.json({ Error: error });
        }
        let pool = yield mssql_1.default.connect(config_1.default);
        let user = yield pool.request()
            .input('username', mssql_1.default.VarChar, username)
            .execute('searchByUsername');
        if (!user.recordset[0]) {
            res.json({ message: `User does not exist` });
        }
        else {
            const validPassword = yield bcrypt_1.default.compare(password, user.recordset[0].password);
            if (validPassword) {
                let payload = yield pool.request().query(`SELECT fullname, email FROM users WHERE username = '${username}'`);
                payload = payload.recordset[0];
                const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, { expiresIn: '10m' });
                res.json({ message: 'Logged in successfully', token: token });
            }
            else {
                res.json({ message: 'Invalid credentials' });
            }
        }
    }
    catch (error) {
        res.json({ Error: error.message });
    }
});
exports.login = login;
const homepage = (req, res) => {
    res.json({ message: 'Welcome...' });
};
exports.homepage = homepage;
//# sourceMappingURL=user.controller.js.map