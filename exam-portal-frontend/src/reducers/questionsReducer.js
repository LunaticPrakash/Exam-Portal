import * as questionsConstants from "../constants/questionsConstants";

const questionsInitialState = {
  loading: false,
  error: null,
  questions: [],
  isAdded: false,
  isDeleted: false,
  isUpdated: false,
};

export const questionsReducer = (state = questionsInitialState, action) => {
  let temp;
  switch (action.type) {
    case questionsConstants.FETCH_QUESTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case questionsConstants.FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: action.payload,
      };

    case questionsConstants.FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case questionsConstants.ADD_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case questionsConstants.ADD_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isAdded: true,
        questions: [...state.questions, action.payload],
      };

    case questionsConstants.ADD_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case questionsConstants.DELETE_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case questionsConstants.DELETE_QUESTION_SUCCESS:
      temp = state.questions;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].quesId == action.payload) {
          temp.splice(i, 1);
        }
      }
      return {
        ...state,
        loading: false,
        isDeleted: true,
        questions: temp,
      };

    case questionsConstants.DELETE_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case questionsConstants.UPDATE_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case questionsConstants.UPDATE_QUESTION_SUCCESS:
      temp = state.questions;
      temp.forEach((ques, index) => {
        if (ques.quesId == action.payload.quesId) {
          temp.splice(index, 1, action.payload);
        }
      });
      return {
        ...state,
        loading: false,
        isUpdated: true,
        questions: temp,
      };
    case questionsConstants.UPDATE_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
