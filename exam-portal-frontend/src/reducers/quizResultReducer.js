import * as quizResultConstants from "../constants/quizResultConstants";

const quizResultInitialState = {
  loading: false,
  error: null,
  quizResults: [],
  isAdded: false,
};

export const quizResultReducer = (state = quizResultInitialState, action) => {
  switch (action.type) {
    case quizResultConstants.FETCH_QUIZ_RESULT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case quizResultConstants.FETCH_QUIZ_RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
        quizResults: action.payload,
      };

    case quizResultConstants.FETCH_QUIZ_RESULT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case quizResultConstants.ADD_QUIZ_RESULT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case quizResultConstants.ADD_QUIZ_RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAdded: true,
        quizResults: [...state.quizResults, action.payload],
      };

    case quizResultConstants.ADD_QUIZ_RESULT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
