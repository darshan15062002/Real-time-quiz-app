"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const QuizManager_1 = require("./QuizManager");
const ADMIN_PASSWORD = "admin";
class UserManager {
    constructor() {
        this.quizManager = new QuizManager_1.QuizManager;
    }
    addUser(socket) {
        this.createHandlers(socket);
    }
    createHandlers(socket) {
        socket.on("join", (data) => {
            console.log("join user called", data);
            const userId = this.quizManager.addUser(data.roomId, data.name);
            socket.emit("init", {
                userId,
                state: this.quizManager.getCurrentState(data.roomId)
            });
            socket.join(data.roomId);
        });
        socket.on("addminJoin", (data) => {
            if (data.password !== ADMIN_PASSWORD) {
                return;
            }
            console.log("join admi called");
            //  empty quiz  get created
            socket.on("createQuiz", data => {
                this.quizManager.addQuiz(data.roomId);
            });
            // empty quiz get updated by new data
            socket.on("createProblem", data => {
                this.quizManager.addProblem(data.roomId, data.problem);
            });
            // when admin add problem to quiz this will show to user 
            socket.on("next", data => {
                this.quizManager.next(data.roomId);
            });
        });
        socket.on("submit", (data) => {
            const userId = data.userId;
            const problemId = data.problemId;
            const submission = data.submission;
            const roomId = data.roomId;
            if (submission != 0 && submission != 1 && submission != 2 && submission != 3) {
                console.error("issue while getting input " + submission);
                return;
            }
            console.log("submitting");
            console.log(roomId);
            this.quizManager.submit(userId, roomId, problemId, submission);
        });
    }
}
exports.UserManager = UserManager;
