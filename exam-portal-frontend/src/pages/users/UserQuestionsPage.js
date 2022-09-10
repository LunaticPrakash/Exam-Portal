import React, { useEffect, useState } from "react";
import "./UserQuestionsPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { fetchQuestionsByQuiz } from "../../actions/questionsActions";
import Question from "../../components/Question";
import Loader from "../../components/Loader";
import swal from "sweetalert";
import * as quizResultConstants from "../../constants/quizResultConstants";
import { submitQuiz } from "../../actions/quizResultActions";
import { fetchQuizzes } from "../../actions/quizzesActions";

const UserQuestionsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get("quizId");
  const quizTitle = urlParams.get("quizTitle");

  const quizzesReducer = useSelector((state) => state.quizzesReducer);
  const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);
  const [quiz, setQuiz] = useState(
    quizzes.filter((q) => q.quizId == quizId)[0]
  );
  const questionsReducer = useSelector((state) => state.questionsReducer);
  const [questions, setQuestions] = useState(questionsReducer.questions);
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.userId : null;

  let answers = {};
  let timoutId = null;
  useEffect(() => {
    console.log("Timer Started!");
    timoutId = setTimeout(() => {
      console.log("Timer Finished!");
      submitQuizHandler(answers, true);
    }, 10000);

    return () => {
      console.log("Timer Finished!");
      clearTimeout(timoutId);
      timoutId = null;
    };
  }, []);

  const submitQuizHandler = (answers, isTimesUp = false) => {
    if (isTimesUp) {
      console.log(answers);
      submitQuiz(dispatch, userId, quizId, answers, token).then((data) => {
        if (data.type === quizResultConstants.ADD_QUIZ_RESULT_SUCCESS) {
          swal(
            "Quiz Submitted!",
            `You scored ${data.payload.totalObtainedMarks} marks in ${quizTitle} quiz.`,
            "success"
          );
          return navigate("/quizResults");
        } else {
          swal(
            "Quiz not Submitted!",
            `${quizTitle} is still active. You can modify your answers`,
            "info"
          );
          return navigate("/quizResults");
        }
      });
    } else {
      swal({
        title: "Are you sure?",
        text: "Once submitted, you will not be able to modify your answers!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willSubmit) => {
        if (willSubmit) {
          submitQuiz(dispatch, userId, quizId, answers, token).then((data) => {
            if (data.type === quizResultConstants.ADD_QUIZ_RESULT_SUCCESS) {
              swal(
                "Quiz Submitted!",
                `You scored ${data.payload.totalObtainedMarks} marks in ${quizTitle} quiz.`,
                "success"
              );
              return navigate("/quizResults");
            } else {
              swal(
                "Quiz not Submitted!",
                `${quizTitle} is still active. You can modify your answers`,
                "info"
              );
              return navigate("/quizResults");
            }
          });
        }
      });
    }
    clearTimeout(timoutId);
    timoutId = null;
  };

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    if (quizzes.length == 0) {
      fetchQuizzes(dispatch, token).then((data) => {
        const temp = data.payload;
        setQuizzes(temp);
        setQuiz(temp.filter((q) => q.quizId == quizId)[0]);
      });
    }
  }, []);

  useEffect(() => {
    fetchQuestionsByQuiz(dispatch, quizId, token).then((data) =>
      setQuestions(data.payload)
    );
  }, []);

  return (
    <div className="userQuestionsPage__container">
      <div className="userQuestionsPage__content">
        <h2>{`Questions : ${quizTitle}`}</h2>
        <Button
          className="userQuestionsPage__content--button"
          onClick={()=>submitQuizHandler(answers)}
        >
          Submit Quiz
        </Button>
        {questions ? (
          questions.map((q, index) => {
            return (
              <Question
                key={index}
                number={index + 1}
                answers={answers}
                question={q}
              />
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default UserQuestionsPage;
