const express = require("express");
const router = express.Router();
const QuizController = require("../controllers/quizz.controller");

// Quiz routes
router.post("/api/quiz/create", QuizController.createQuiz);
router.post("/api/quiz/update", QuizController.updateQuiz);
router.post("/api/quiz/delete", QuizController.deleteQuiz);
router.post("/api/questions/quiz", QuizController.getQuestionsBYQuizID);
router.get("/api/questions/quiz/:id", QuizController.getAllQuestionsBYQuizID);
router.post("/api/quiz/all", QuizController.getAllQuizzes);
router.get("/api/quiz/:quizId", QuizController.getByQuizId);

// Question routes
router.post("/api/questions/create", QuizController.createQuestion);
router.post("/api/questions/update", QuizController.updateQuestion);
router.post("/api/questions/delete", QuizController.deleteQuestion);
router.post("/api/questions/all", QuizController.getAllQuestions);
router.post("/api/save-result", QuizController.saveResult);
router.post("/api/all-result", QuizController.allResult);
router.get("/api/dashboard/stats", QuizController.getDashboardStats);
router.get("/api/dashboard/weekly-attempts", QuizController.weeklyAttempts);
router.get("/api/dashboard/average-score", QuizController.averageScore);
router.post("/api/get-certificate-data", QuizController.GetCertificate);
router.post("/api/create-quiz-play", QuizController.createQuizPlay);
router.post("/api/get-quiz-play", QuizController.getQuizPlay);
router.post("/api/get-all-quiz-play", QuizController.getQuizAllPlay);
router.post("/api/get-quiz-play-byid", QuizController.getQuizPlayByID);
router.post("/api/delete-quiz-play", QuizController.deleteQuizPlay);


module.exports = router;
