import React, { useState } from "react";
import "./AdminAddCategoryPage.css";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as categoriesConstants from "../../../constants/categoriesConstants";
import FormContainer from "../../../components/FormContainer";
import Sidebar from "../../../components/Sidebar";
import {
  addCategory,
  fetchCategories,
} from "../../../actions/categoriesActions";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const AdminAddCategoryPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const category = { title: title, description: description };
    addCategory(dispatch, category, token).then((data) => {
      if (data.type === categoriesConstants.ADD_CATEGORY_SUCCESS) {
        swal("Category Added!", `${title} succesfully added`, "success");
      } else {
        swal("Category Not Added!", `${title} not added`, "error");
      }
      // navigate("/adminCategories");
    });
  };

  return (
    <div className="adminAddCategoryPage__container">
      <div className="adminAddCategoryPage__sidebar">
        <Sidebar />
      </div>
      <div className="adminAddCategoryPage__content">
        <FormContainer>
          <h2>Add Category</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                style={{ textAlign: "top" }}
                as="textarea"
                rows="5"
                type="text"
                placeholder="Enter Category Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Button
              className="my-3 adminAddCategoryPage__content--button"
              type="submit"
              variant=""
            >
              Add
            </Button>
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

export default AdminAddCategoryPage;
