import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import LessonApi from "../../../api/LessonApi";
import UserApi from "../../../api/UserApi";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import ResultApi from "../../../api/ResultApi";

const AnswerLesson = () => {
  if (!UserApi.isLogin()) {
    window.location = "/";
  }

  const [page, setPage] = useState(0);
  const [word, setword] = useState([]);

  const [lessonID, setLessonID] = useState([]);
  const [question, setQuestion] = useState([]);
  const [numOfQuestion, setNumOfQuestion] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const questions = () => {
    LessonApi.getLessonId(id).then((res) => {
      let id = res.data[0].id;
      setLessonID(res.data[0].id);
      LessonApi.getQuestion(id).then((res) => {
        setQuestion(res.data.words[page]);
        setCorrectAnswer(res.data.answer);
        setword(res.data.words);
        setNumOfQuestion(res.data.words.length);
      });
    });
  };

  const addAnswer = (e) => {
    setSelectedAnswer((currSelectedAnswer) => [...currSelectedAnswer, e]);
    if (
      page !== numOfQuestion - 1 &&
      selectedAnswer.length + 1 !== numOfQuestion
    ) {
      setPage((currPage) => currPage + 1);
    }
  };

  useEffect(() => {
    questions();
  }, [page]);

  const saveResult = (result) => {
    const data = {
      lesson_id: lessonID,
      score: result,
    };
    ResultApi.postResult(data);
  };

  useEffect(() => {
    if (page === numOfQuestion - 1 && selectedAnswer.length === numOfQuestion) {
      swal("Success", "Thank you for answering.", "success");
      let score = 0;
      const result = correctAnswer.map((item, index) => {
        if (item.answer === selectedAnswer[index]) {
          score++;
          return true;
        } else {
          return false;
        }
      });
      saveResult(result);
      navigate("/answer-result", {
        state: { result, word, id, score },
      });
    }
  }, [page, selectedAnswer]);

  return (
    <div className="container">
      <div className="progressbar">
        <div className="form">
          <div className="d-flex mt-5">
            <div className="container">
              <h1>WORD</h1>
              <h3 className="display-4">{question.word}</h3>
            </div>
            <div className="container d-flex flex-column">
              <h6>
                {page + 1} out of {numOfQuestion}
              </h6>
              <button
                onClick={() => addAnswer(question.choiceA)}
                className="btn btn-primary mt-1"
              >
                {question.choiceA}
              </button>
              <button
                onClick={() => addAnswer(question.choiceB)}
                className="btn btn-primary mt-1"
              >
                {question.choiceB}
              </button>
              <button
                onClick={() => addAnswer(question.choiceC)}
                className="btn btn-primary mt-1"
              >
                {question.choiceC}
              </button>
              <button
                onClick={() => addAnswer(question.choiceD)}
                className="btn btn-primary mt-1"
              >
                {question.choiceD}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnswerLesson;
