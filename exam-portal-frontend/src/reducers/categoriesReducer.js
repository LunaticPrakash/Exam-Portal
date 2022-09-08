import * as categoriesConstants from "../constants/categoriesConstants";

const categoriesInitialState = {
  loading: false,
  error: null,
  categories: [],
  isAdded: false,
  isDeleted: false,
  isUpdated: false,
};

export const categoriesReducer = (state = categoriesInitialState, action) => {
  switch (action.type) {
    case categoriesConstants.FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case categoriesConstants.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case categoriesConstants.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case categoriesConstants.ADD_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoriesConstants.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isAdded: true,
        categories: [...state.categories, action.payload],
      };
    case categoriesConstants.ADD_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case categoriesConstants.DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case categoriesConstants.DELETE_CATEGORY_SUCCESS:
      const temp = state.categories;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].catId == action.payload) {
          temp.splice(i, 1);
        }
      }
      return {
        ...state,
        loading: false,
        isDeleted: true,
        categories: temp,
      };

    case categoriesConstants.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case categoriesConstants.UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case categoriesConstants.UPDATE_CATEGORY_SUCCESS:
      const temp2 = state.categories;
      temp2.forEach((cat) => {
        if (cat.catId == action.payload.catId) {
          cat.title = action.payload.title;
          cat.description = action.payload.description;
        }
      });
      return {
        ...state,
        loading: false,
        isUpdated: true,
        categories: temp2,
      };

    case categoriesConstants.UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const addcategoryInitialState = {
  loading: false,
  error: null,
  isAdded: false,
};
