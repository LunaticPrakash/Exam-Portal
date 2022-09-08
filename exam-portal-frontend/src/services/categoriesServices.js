import axios from "axios";

const fetchCategories = async (token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.get("/api/category/", config);
    console.log("categoryService:fetchCategories() Success: ", data);
    return data;
  } catch (error) {
    console.error(
      "categoryService:fetchCategories() Error: ",
      error.response.statusText
    );
    return error.response.statusText;
  }
};

const addCategory = async (category, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.post("/api/category/", category, config);
    console.log("categoryService:addCategory() Success: ", data);
    return { data: data, isAdded: true, error: null };
  } catch (error) {
    console.error(
      "categoryService:addCategory() Error: ",
      error.response.statusText
    );
    return { data: null, isAdded: false, error: error.response.statusText };
  }
};

const deleteCategory = async (catId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.delete(`/api/category/${catId}/`, config);
    console.log("categoryService:deleteCategory()  Success: ", data);
    return {
      isDeleted: true,
      error: null,
    };
  } catch (error) {
    console.error(
      "categoryService:deleteCategory()  Error: ",
      error.response.statusText
    );
    return {
      isDeleted: false,
      error: error.response.statusText,
    };
  }
};

const updateCategory = async (category, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.put(
      `/api/category/${category.catId}/`,
      category,
      config
    );
    console.log("categoryService:updateCategory()  Success: ", data);
    return {
      data: data,
      isUpdated: true,
      error: null,
    };
  } catch (error) {
    console.error(
      "categoryService:updateCategory()  Error: ",
      error.response.statusText
    );
    return {
      data: null,
      isUpdated: false,
      error: error.response.statusText,
    };
  }
};

const categoriesService = {
  addCategory,
  fetchCategories,
  updateCategory,
  deleteCategory,
};
export default categoriesService;
