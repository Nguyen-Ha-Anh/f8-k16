"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = 3000;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("<h1>hello express typescript 1</h1>");
});
app.get('/users', (req, res) => {
    const users = [
        {
            id: 1,
            name: 'An',
            email: 'an@gmail.com',
        }
    ];
    // const a: any = 10
    // console.log(a)
    return res.json(users);
});
app.listen(PORT, () => {
    console.log(`Start server: http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map