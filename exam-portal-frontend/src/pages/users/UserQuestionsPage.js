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
import ReactSpinnerTimer from "react-spinner-timer";

const UserQuestionsPage = () => {
  Number.prototype.zeroPad = function () {
    return ("0" + this).slice(-2);
  };

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
  const [timeRemaining, setTimeRemaining] = useState(questions.length * 2 * 60);
  console.log("timeRemaining ", timeRemaining);
  let answers = {};
  let intervalId = null;

  useEffect(() => {
    intervalId = setInterval(() => {
      if (timeRemaining <= 0) {
        submitQuizHandler(answers, true);
      } else {
        setTimeRemaining((prev) => prev - 1);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
      intervalId = null;
    };
  }, []);

  const submitQuizHandler = (isTimesUp = false) => {
    const answers = JSON.parse(localStorage.getItem("answers"));
    if (isTimesUp) {
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
    console.log("Clearing Interval");
    clearInterval(intervalId);
    intervalId = null;
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
    fetchQuestionsByQuiz(dispatch, quizId, token).then((data) => {
      setQuestions(data.payload);
      setTimeRemaining(data.payload.length * 2 * 60);
    });
  }, []);

  return (
    <div className="userQuestionsPage__container">
      <div className="userQuestionsPage__content">
        <h2>{`Questions : ${quizTitle}`}</h2>
        <div className="userQuestionsPage__content--options">
          <Button
            className="userQuestionsPage__content--button"
            onClick={() => submitQuizHandler()}
          >
            Submit Quiz
          </Button>
          <div className="userQuestionsPage__content--spinner">
            <ReactSpinnerTimer
              timeInSeconds={questions.length * 1 * 60}
              totalLaps={questions.length * 1 * 60}
              onLapInteraction={() => {
                submitQuizHandler(true);
              }}
              isRefresh={false}
              isPause={false}
            />
            <h4 style={{ marginTop: "18px" }}>{`${parseInt(
              timeRemaining / 60
            ).zeroPad()} : ${(timeRemaining % 60).zeroPad()}`}</h4>
            Timer
          </div>
        </div>
        {questions ? (
          questions.map((q, index) => {
            return <Question key={index} number={index + 1} question={q} />;
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default UserQuestionsPage;
