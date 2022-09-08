import * as quizzesConstants from "../constants/quizzesConstants";

const quizzesInitialState = {
  loading: false,
  error: null,
  quizzes: [],
  isAdded: false,
  isDeleted: false,
  isUpdated: false,
};

export const quizzesReducer = (state = quizzesInitialState, action) => {
  let temp = [];
  switch (action.type) {
    case quizzesConstants.FETCH_QUIZZES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case quizzesConstants.FETCH_QUIZZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizzes: action.payload,
      };

    case quizzesConstants.FETCH_QUIZZES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case quizzesConstants.DELETE_QUIZ_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case quizzesConstants.DELETE_QUIZ_SUCCESS:
      temp = state.quizzes;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].quizId == action.payload) {
          temp.splice(i, 1);
        }
      }
      return {
        ...state,
        loading: false,
        isDeleted: true,
        quizzes: temp,
      };

    case quizzesConstants.DELETE_QUIZ_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case quizzesConstants.ADD_QUIZ_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case quizzesConstants.ADD_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        isAdded: true,
        quizzes: [...state.quizzes, action.payload],
      };

    case quizzesConstants.ADD_QUIZ_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case quizzesConstants.UPDATE_QUIZ_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case quizzesConstants.UPDATE_QUIZ_SUCCESS:
      temp = state.quizzes;
      temp.forEach((quiz, index) => {
        if (quiz.quizId == action.payload.quizId) {
          temp.splice(index,1, action.payload);
        }
      });
      return {
        ...state,
        loading: false,
        isUpdated: true,
        quizzes: temp,
      };

    case quizzesConstants.UPDATE_QUIZ_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
