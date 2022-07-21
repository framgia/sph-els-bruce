import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import LessonApi from "../../../api/LessonApi";
import UserApi from "../../../api/UserApi";
import { useNavigate } from "react-router";
import swal from "sweetalert";

const AnswerLesson = () => {
  if (!UserApi.isLogin()) {
    window.location = "/";
  }

  const [page, setPage] = useState(0);
  const [word, setword] = useState([]);
  const [question, setQuestion] = useState([]);
  const [numOfQuestion, setNumOfQuestion] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [lessonId, setLessonId] = useState(0);

  const { id } = useParams();

  const navigate = useNavigate();

  // console.log(o)
  const questions = () => {
    LessonApi.getLessonId(id).then((res) => {
      let id = res.data[0].id;
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

  useEffect(() => {
    if (page === numOfQuestion - 1 && selectedAnswer.length === numOfQuestion) {
      swal("Success", "Thank you for answering.", "success");
      const result = correctAnswer.map(
        (item, index) => item.answer === selectedAnswer[index]
      );
      navigate("/answer-result", { state: { result, word, id } });
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
