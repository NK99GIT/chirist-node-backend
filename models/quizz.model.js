const knex = require("../config/knex");

// exports.createQuiz = async (data) => {
//   return await knex("quizzes").insert(data);
// };

exports.createQuiz = async (data) => {
  const [id] = await knex("quizzes").insert(data);
  return id;
};

exports.updateQuiz = async (id, data) => {
  return await knex("quizzes").where({ id }).update(data);
};

exports.deleteQuiz = async (id) => {
  return await knex("quizzes").where({ id }).del();
};

// exports.getAllQuizzes = async () => {
//   return await knex("quizzes").select("*").orderBy("id", "desc").leftJoin('questions').count();
// };

exports.getAllQuizzes = async () => {
  return await knex("quizzes")
    .leftJoin("questions", "quizzes.id", "questions.quiz_id")
    .select(
      "quizzes.*",
      knex.raw("COUNT(questions.id) AS question_count")
    )
    .groupBy("quizzes.id")
    .orderBy("quizzes.id", "desc");
};

exports.getQuizPlay = async (req) => {
  return await knex("quiz_play") 
    .select("*").where('quiz_id',req.body.id) 
    .orderBy("quiz_play.id", "desc");
};
exports.getQuizAllPlay = async (req) => {
  console.log(req.body.limit);

  const query = knex("quiz_play").select("*").orderBy("created_at", "desc");

    if (req.body.limit != undefined) {
    query.limit(req.body.limit);
  }
  return await query;
};


exports.getQuizPlayByID = async (req) => {
  console.log(req.body)
  return await knex("quiz_play") 
    .select("*").where('id',req.body.id);
};

exports.deleteQuizPlay = async (id) => {
  return await knex("quiz_play").where({ id }).del();
};

exports.createQuestion = async (data) => {
  return await knex("questions").insert(data);
};

exports.updateQuestion = async (id, data) => {
  return await knex("questions").where({ id }).update(data);
};

exports.deleteQuestion = async (id) => {
  return await knex("questions").where({ id }).del();
};

exports.getAllQuestions = async (quiz_id) => {
  return await knex("questions").where({ quiz_id }).select("*").orderBy("id", "desc");
};

exports.getByQuizId = async (quizId) => {
  return await knex("quizzes")
    .where({ id: quizId })
    .select("*");
};
exports.getQuestionsBYQuizID = async (quizId,limit,offset) => {
  return await knex("questions")
    .where({ quiz_id: quizId })
    .select("*").orderBy("id", "desc").limit(limit).offset(offset);
};
exports.getAllQuestionsQuizID = async (quizId) => {
  return await knex("questions")
    .where({ quiz_id: quizId })
    .select("*").orderBy("id", "desc");
};

exports.allResult = async (data) => {
  console.log(data);
  console.log(data?.limit, data?.offset);

  const query = knex("results").select("*").orderBy("score", "desc");

  if (data?.limit != undefined) {
    query.limit(data.limit);
  }

  if (data?.offset != undefined) {
    query.offset(data.offset);
  }
  return await query;
};


exports.saveResult = async (data) => {
   return await knex("results").insert(data);
};
exports.getAllDashboardStats = async () => {
  const [
    quizzes,
    users,
    attempts,
    leaderboard,
    questions,
    recentAttempts
  ] = await Promise.all([
    knex("quizzes").count("id as total").first(),
    knex("results").countDistinct("phone as total").first(),
    knex("results").count("id as total").first(),
    knex("results").countDistinct("phone as total").first(),
    knex("questions").count("id as total").first(), // ✅ added question count
    knex("results as a")
      .join("quizzes as q", "a.quiz_id", "q.id")
      .select(
        "a.name",
        "q.title as quiz",
        "a.score",
        knex.raw("DATE_FORMAT(a.created_at, '%d %b') as date")
      )
      .orderBy("a.created_at", "desc")
      .limit(5)
  ]);

  return {
    quizzes: quizzes.total,
    users: leaderboard.total,          // reused
    attempts: attempts.total,
    leaderboard: leaderboard.total,    // reused
    questions: questions.total,        // ✅ added to result
    recentAttempts
  };
};


exports.getAverageScoresByQuiz = async () => {
  return await knex("results as r")
    .join("quizzes as q", "r.quiz_id", "q.id")
    .select(
      "q.title as quiz",
      knex.raw("ROUND(AVG(r.percentage), 1) as avg_score")
    )
    .groupBy("q.id")
    .orderBy("avg_score", "desc");
};

exports.GetCertificate = async (req, res) => {
  try {
    const { id, phone } = req.body; 
    if (!id || !phone) {
      return res.status(400).json({ error: "Missing id or phone" });
    }
    const result = await knex("results")
      .select("*")
      .where({ quiz_id: id, phone })
      .limit(1);
   return result;
  } catch (error) {
    console.error("Error fetching certificate data:", error);
    res.status(500).json({ error: "Failed to fetch certificate data" });
  }
};


exports.getWeeklyAttempts = async () => {
  return await knex
    .from(function () {
      this.select(
        knex.raw("DAYNAME(created_at) AS day"),
        knex.raw("COUNT(*) AS total")
      )
        .from("results")
        .groupByRaw("DAYNAME(created_at)")
        .as("weekly");
    })
    .orderByRaw(`
      FIELD(day, 
        'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')
    `);
};

exports.createQuizPlay = async (data) => {
    data.created_at = knex.fn.now();
    data.updated_at = knex.fn.now();
  const [id] = await knex("quiz_play").insert(data);
  return id;
};
