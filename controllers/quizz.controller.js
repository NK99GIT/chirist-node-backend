const QuizModel = require("../models/quizz.model");

exports.createQuiz = async (req, res) => {
  const insertData = {
    title: req.body.title,
    category: req.body.category,
    description: req.body.description || null,
  };

  try {
    let data = await QuizModel.createQuiz(insertData);
    res.status(201).json({ message: "Quiz created successfully", id: data });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const { id } = req.body;
    const insertData = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description || null,
    };
    await QuizModel.updateQuiz(id, insertData);
    res.status(200).json({ message: "Quiz updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.body;
    await QuizModel.deleteQuiz(id);
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAllQuizzes = async (req, res) => {

  try {
    const data = await QuizModel.getAllQuizzes();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getQuizPlay = async (req, res) => {
  try {
    const data = await QuizModel.getQuizPlay(req);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
exports.getQuizAllPlay = async (req, res) => {
  try {
    const data = await QuizModel.getQuizAllPlay(req);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
exports.getQuizPlayByID = async (req, res) => {
  try {
    const data = await QuizModel.getQuizPlayByID(req);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteQuizPlay = async (req, res) => {
  console.log(req.body)
  const id = req.body.id;

  try {
    const data = await QuizModel.deleteQuizPlay(id);
    console.log(data)
    if(data===1){
      res.status(200).json({ message: "Deleted Sucessfuly"});
    }
    // res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getByQuizId = async (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = await QuizModel.getByQuizId(quizId);
    res.json(quiz);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// =================== QUESTIONS ===================

exports.createQuestion = async (req, res) => {
  try {
    await QuizModel.createQuestion(req.body);
    res.status(201).json({ message: "Question added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.body;

    const updateData = {
      question: req.body.question,
      options: JSON.stringify(req.body.options),
      correct_answer: req.body.correct_answer,
      quiz_id: req.body.quiz_id,
      answer: req.body.answer
    };

    await QuizModel.updateQuestion(id, updateData);
    res.status(200).json({ message: "Question updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.body;
    await QuizModel.deleteQuestion(id);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const { quiz_id } = req.body;
    const data = await QuizModel.getAllQuestions(quiz_id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getQuestionsBYQuizID = async (req, res) => {
  try {
    req.body.phone = req.body.phone
    req.body.id = req.body.quizId
    const Quiz = await QuizModel.GetCertificate(req);
    const { quizId, limit, offset } = req.body; 
    if (Quiz.length === 0) {
      const data = await QuizModel.getQuestionsBYQuizID(quizId, limit, offset);
      res.status(200).json(data);
    } else {
      
      res.status(200).json('Already Extis');
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
exports.getAllQuestionsBYQuizID = async (req, res) => {
  try {
    const quizId = req.params.id;
    const data = await QuizModel.getAllQuestionsQuizID(quizId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.allResult = async (req, res) => {
  try {
    const data = await QuizModel.allResult();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.saveResult = async (req, res) => {
  const insertData = {
    quiz_id: req.body.data.quiz_id,
    name: req.body.data.name,
    phone: req.body.data.phone,
    score: req.body.data.score,
    anbiyam: req.body.data.anbiyam,
    percentage: req.body.data.percentage,
    quiz_title: req.body.data.quiz_title,
    answered: req.body.data.answered,
    skipped: req.body.data.skipped,
    is_website : req.body.data.is_website || 0 ,
  };

  try {
    let data = await QuizModel.saveResult(insertData);
    res.status(201).json({ message: "Result Saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const data = await QuizModel.getAllDashboardStats();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.weeklyAttempts = async (req, res) => {
  try {
    const data = await QuizModel.getWeeklyAttempts();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// Get average score by quiz
exports.averageScore = async (req, res) => {
  try {
    const data = await QuizModel.getAverageScoresByQuiz();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

exports.GetCertificate = async (req, res) => {
  try {
    const data = await QuizModel.GetCertificate(req);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

exports.createQuizPlay = async (req, res) => {
   const data =  {
    quiz_id: req.body.quiz_id,
    quiz_play_name: req.body.quiz_play_name,
    keyword: req.body.keyword,
    offset: req.body.offset,
    limit: req.body.limit,
    valid_time: req.body.valid_time,
    link:req.body.link,
    is_active: req.body.is_active ?? 1
  }

  try {
    const result = await QuizModel.createQuizPlay(data);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

