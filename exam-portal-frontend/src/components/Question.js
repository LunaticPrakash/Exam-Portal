import React from "react";
import { InputGroup } from "react-bootstrap";
import "./Question.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../actions/questionsActions";
import swal from "sweetalert";
import * as questionsConstants from "../constants/questionsConstants";

const Question = ({ number, answers, question }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const answer = question.answer;
  const token = JSON.parse(localStorage.getItem("jwtToken"));

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
            answers[question.quesId] = e.target.value;
            console.log(answers);
          }}
        >
          <div className="question__options--2">
            <div className="question__options--optionDiv">
              <InputGroup.Radio
                value={"option1"}
                name="test"
                aria-label="option 1"
              />
              <span className="question__options--optionText">
                {question.option1}
              </span>
            </div>
            <div className="question__options--optionDiv">
              <InputGroup.Radio
                value={"option2"}
                name="test"
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
                name="test"
                aria-label="option 3"
              />
              <span className="question__options--optionText">
                {question.option3}
              </span>
            </div>
            <div className="question__options--optionDiv">
              <InputGroup.Radio
                value={"option4"}
                name="test"
                aria-label="Radio 1"
              />
              <span className="question__options--optionText">
                {question.option4}
              </span>
            </div>
          </div>
        </InputGroup>
      </div>
      <p style={{ margin: "5px" }}>{`Correct Answer: ${question[answer]}`}</p>
      <hr />
      <div className="question__content--editButtons">
        <div
          onClick={() => updateQuestionHandler(question)}
          style={{
            margin: "2px 8px",
            textAlign: "center",
            color: "rgb(68 177 49)",
            fontWeight: "500",
          }}
        >{`Update`}</div>

        <div
          onClick={() => deleteQuestionHandler(question)}
          style={{
            margin: "2px 8px",
            textAlign: "center",
            color: "red",
            fontWeight: "500",
          }}
        >{`Delete`}</div>
      </div>
    </div>
  );
};

export default Question;
