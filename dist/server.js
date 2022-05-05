"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const user_routes_1 = __importDefault(require("./Routes/user.routes"));
// import mssql from 'mssql'
// import sqlConfig from './Config/config'
app.use(express_1.default.json());
app.use('/users', user_routes_1.default);
const port = 1024;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
// const checkConnection = async() => {
//     try {
//         await mssql.connect(sqlConfig).then(
//             conn => {
//                 if (conn.connected) {
//                     console.log('DB connected')                
//                 }
//             }
//         )
//     } catch (error: any) {
//         console.log(error.message)        
//     }
// }
// checkConnection()
//# sourceMappingURL=server.js.map