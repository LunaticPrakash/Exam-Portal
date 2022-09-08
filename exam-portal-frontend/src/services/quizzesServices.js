import axios from "axios";

const fetchQuizzes = async (token, catId) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let quizzes = null;
    if (catId === null) {
      const { data } = await axios.get("/api/quiz/", config);
      quizzes = data;
    } else {
      const { data } = await axios.get(`/api/quiz/?catId=${catId}`, config);
      quizzes = data;
    }
    console.log("quizzesServices:fetchQuizzes() Success: ", quizzes);
    return quizzes;
  } catch (error) {
    console.error(
      "quizzesServices:fetchQuizzes() Error: ",
      error.response.statusText
    );
    return error.response.statusText;
  }
};

const addQuiz = async (quiz, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.post("/api/quiz/", quiz, config);
    console.log("quizzesServices:addQuiz()  Success: ", data);
    return { data: data, isAdded: true, error: null };
  } catch (error) {
    console.error(
      "quizzesServices:addQuiz()  Error: ",
      error.response.statusText
    );
    return { data: null, isAdded: false, error: error.response.statusText };
  }
};

const deleteQuiz = async (quizId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.delete(`/api/quiz/${quizId}/`, config);
    console.log("quizzesServices:deleteQuiz()  Success: ", data);
    return {
      isDeleted: true,
      error: null,
    };
  } catch (error) {
    console.error(
      "quizzesServices:deleteQuiz()  Error: ",
      error.response.statusText
    );
    return {
      isDeleted: false,
      error: error.response.statusText,
    };
  }
};

const updateQuiz = async (quiz, token) => {
  console.log(quiz);
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.put(`/api/quiz/${quiz.quizId}/`, quiz, config);
    console.log("quizzesServices:updateQuiz()  Success: ", data);
    return {
      data: data,
      isUpdated: true,
      error: null,
    };
  } catch (error) {
    console.error(
      "quizzesServices:updateQuiz()  Error: ",
      error.response.statusText
    );
    return {
      data: null,
      isUpdated: false,
      error: error.response.statusText,
    };
  }
};

const quizzesService = { fetchQuizzes, addQuiz, deleteQuiz, updateQuiz };
export default quizzesService;
