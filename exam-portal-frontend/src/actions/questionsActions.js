import * as questionsConstants from "../constants/questionsConstants";
import questionsServices from "../services/questionsServices";

export const fetchQuestionsByQuiz = async (dispatch, quizId, token) => {
  dispatch({ type: questionsConstants.FETCH_QUESTIONS_REQUEST });
  const data = await questionsServices.fetchQuestionsByQuiz(quizId, token);
  if (data) {
    return dispatch({
      type: questionsConstants.FETCH_QUESTIONS_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: questionsConstants.FETCH_QUESTIONS_FAILURE,
      payload: data,
    });
  }
};

export const addQuestion = async (dispatch, question, token) => {
  dispatch({ type: questionsConstants.ADD_QUESTION_REQUEST });
  const { data, isAdded, error } = await questionsServices.addQuestion(
    question,
    token
  );
  if (isAdded) {
    return dispatch({
      type: questionsConstants.ADD_QUESTION_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: questionsConstants.ADD_QUESTION_FAILURE,
      payload: error,
    });
  }
};

export const deleteQuestion = async (dispatch, quesId, token) => {
  dispatch({ type: questionsConstants.DELETE_QUESTION_REQUEST });
  const { isDeleted, error } = await questionsServices.deleteQuestion(
    quesId,
    token
  );
  if (isDeleted) {
    return dispatch({
      type: questionsConstants.DELETE_QUESTION_SUCCESS,
      payload: quesId,
    });
  } else {
    return dispatch({
      type: questionsConstants.DELETE_QUESTION_FAILURE,
      payload: error,
    });
  }
};

export const updateQuestion = async (dispatch, question, token) => {
  dispatch({ type: questionsConstants.UPDATE_QUESTION_REQUEST });
  const { data, isUpdated, error } =
    await questionsServices.updateQuestion(question, token);
  if (isUpdated) {
    return dispatch({
      type: questionsConstants.UPDATE_QUESTION_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: questionsConstants.UPDATE_QUESTION_FAILURE,
      payload: error,
    });
  }
};
