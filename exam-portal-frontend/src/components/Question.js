import React from "react";
import { InputGroup } from "react-bootstrap";
import "./Question.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../actions/questionsActions";
import swal from "sweetalert";
import * as questionsConstants from "../constants/questionsConstants";

const Question = ({ number, answers, question, isAdmin = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const answer = question.answer;
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const saveAnswer = (quesId, ans) => {
    const newAns = {};
    newAns[quesId] = ans;
    let answers = JSON.parse(localStorage.getItem("answers"));
    if (answers) {
      answers[quesId] = ans;
      localStorage.setItem("answers", JSON.stringify(answers));
    } else {
      localStorage.setItem("answers", JSON.stringify(newAns));
    }
  };
  const updateQuestionHandler = (ques) => {
    navigate(`/adminUpdateQuestion/${ques.quesId}/?quizId=${ques.quiz.quizId}`);
  };

  const deleteQuestionHandler = (ques) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this question!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteQuestion(dispatch, ques.quesId, token).then((data) => {
          if (data.type === questionsConstants.DELETE_QUESTION_SUCCESS) {
            swal(
              "Question Deleted!",
              `Question with id ${ques.quesId}, succesfully deleted`,
              "success"
            );
          } else {
            swal(
              "Question Not Deleted!",
              `Question with id ${ques.quesId} not deleted`,
              "error"
            );
          }
        });
      } else {
        swal(`Question with id ${ques.quesId} is safe`);
      }
    });
  };

  return (
    <div className="question__container">
      <div className="question__content">
        {number + ". " + question.content}
      </div>
      <div className="question__options">
        <InputGroup
          onChange={(e) => {
            saveAnswer(question.quesId, e.target.value);

          }}
        >
          <div className="question__options--2">
            <div className="question__options--optionDiv">
              <InputGroup.Radio
                value={"option1"}
                name={number}
                aria-label="option 1"
              />
              <span className="question__options--optionText">
                {question.option1}
              </span>
            </div>
            <div className="question__options--optionDiv">
              <InputGroup.Radio
                value={"option2"}
                name={number}
                aria-label="option 2"
              />
              <span className="question__options--optionText">
                {question.option2}
              </span>
            </div>
          </div>

          <div className="question__options--2">
            <div className="question__options--optionDiv">
              <InputGroup.Radio
                value={"option3"}
                name={number}
                aria-label="option 3"
              />
              <span className="question__options--optionText">
                {question.option3}
              </span>
            </div>
            <div className="question__options--optionDiv">
              <InputGroup.Radio
                value={"option4"}
                name={number}
                aria-label="option 4"
              />
              <span className="question__options--optionText">
                {question.option4}
              </span>
            </div>
          </div>
        </InputGroup>
      </div>
      {isAdmin && (
        <div>
          <p
            style={{ margin: "5px" }}
          >{`Correct Answer: ${question[answer]}`}</p>
          <hr />
          <div className="question__content--editButtons">
            <div
              onClick={() => updateQuestionHandler(question)}
              style={{
                margin: "2px 8px",
                textAlign: "center",
                color: "rgb(68 177 49)",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >{`Update`}</div>

            <div
              onClick={() => deleteQuestionHandler(question)}
              style={{
                margin: "2px 8px",
                textAlign: "center",
                color: "red",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >{`Delete`}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
