"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizManager = void 0;
const Quiz_1 = require("../Quiz");
let globalProblemId = 0;
class QuizManager {
    constructor() {
        this.quizes = [];
    }
    start(roomId) {
        const quiz = this.getQuiz(roomId);
        if (!quiz) {
            return;
        }
        quiz.start();
    }
    addUser(roomId, name) {
        var _a;
        return (_a = this.getQuiz(roomId)) === null || _a === void 0 ? void 0 : _a.addUser(name);
    }
    getQuiz(roomId) {
        var _a;
        return (_a = this.quizes.find((x) => x.roomId === roomId)) !== null && _a !== void 0 ? _a : null;
    }
    addProblem(roomId, problem) {
        console.log("adding problem");
        const quiz = this.getQuiz(roomId);
        console.log(quiz);
        if (!quiz) {
            return;
        }
        quiz.addProblem(Object.assign(Object.assign({}, problem), { id: (globalProblemId++).toString(), startTime: new Date().getTime(), submissions: [] }));
    }
    next(roomId) {
        const quiz = this.getQuiz(roomId);
        if (!quiz) {
            return;
        }
        quiz.next();
    }
    submit(userId, roomId, problemId, submission) {
        var _a;
        (_a = this.getQuiz(roomId)) === null || _a === void 0 ? void 0 : _a.submit(userId, roomId, problemId, submission);
    }
    getCurrentState(roomId) {
        const quiz = this.quizes.find((x) => x.roomId === roomId);
        if (!quiz) {
            return null;
        }
        return quiz.getCurrentState();
    }
    addQuiz(roomId) {
        if (this.getQuiz(roomId)) {
            return;
        }
        const quiz = new Quiz_1.Quiz(roomId);
        this.quizes.push(quiz);
    }
}
exports.QuizManager = QuizManager;
