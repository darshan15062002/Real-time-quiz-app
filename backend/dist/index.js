"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IoManager_1 = require("./manager/IoManager");
const UserManager_1 = require("./manager/UserManager");
const io = IoManager_1.IoManager.getIo();
const userManager = new UserManager_1.UserManager();
io.on('connection', (socket) => {
    userManager.addUser(socket);
});
io.listen(3000);
