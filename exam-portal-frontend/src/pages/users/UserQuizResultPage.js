import React, { useEffect, useState } from "react";
import SidebarUser from "../../components/SidebarUser";
import "./UserQuizResultPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuizResult } from "../../actions/quizResultActions";
import * as quizResultConstants from "../../constants/quizResultConstants";
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const UserQuizResultPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizResultReducer = useSelector((state) => state.quizResultReducer);
  const [quizResults, setQuizResults] = useState(null);
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.userId : null;

  useEffect(() => {
    if (quizResults == null)
      fetchQuizResult(dispatch, userId, token).then((data) => {
        if (data.type === quizResultConstants.FETCH_QUIZ_RESULT_SUCCESS) {
          setQuizResults(data.payload);
        }
      });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  return (
    <div className="userQuizResultPage__container">
      <div className="userQuizResultPage__sidebar">
        <SidebarUser />
      </div>

      <div className="userQuizResultPage__content">
        {quizResults && quizResults.length !== 0 ? (
          <Table bordered className="userQuizResultPage__content--table">
            <thead>
              <tr>
                <th>Quiz Id</th>
                <th>Quiz Name</th>
                <th>Category Name</th>
                <th>Obtained Marks</th>
                <th>Total Marks</th>
                <th>Date</th>
              </tr>
            </thead>
            {quizResults.map((r, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{r.quiz.quizId}</td>
                    <td>{r.quiz.title}</td>
                    <td>{r.quiz.category.title}</td>
                    <td>{r.totalObtainedMarks}</td>
                    <td>{r.quiz.maxMarks}</td>
                    <td>{r.attemptDatetime}</td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        ) : (
          <Message>
            No results to display. Attemp any <Link to="/quizzes">Quiz.</Link>
          </Message>
        )}
      </div>
    </div>
  );
};

export default UserQuizResultPage;
