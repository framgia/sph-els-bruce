import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import AdminApi from "../../../api/AdminApi";

const AnswerLesson = () => {
  if (AdminApi.isAdmin() === "admin@gmail.com") {
    window.location = "/admin/dashboard";
  }
  const location = useLocation();
  const [result, setResult] = useState([]);
  const [category, setCategory] = useState([]);
  const [words, setWords] = useState([]);

  const getCategory = () => {
    const id = location.state.id;
    AdminApi.editCategory(id).then((res) => {
      setCategory(res.data);
    });
  };

  useEffect(() => {
    getCategory();
    setWords(location.state.word);
    setResult(location.state.result);
  }, []);

  return (
    <div className="card m-5">
      <div className="card-header">
        <h5>Test Result</h5>
      </div>
      <div className="card-body">
        <h5 className="card-title">{category.title}</h5>
        <p className="card-text">{category.description}</p>

        <div className="d-md-flex justify-content-center">
          <div className="m-5">
            <h2 className="text-primary">Result</h2>
            {result.map((item) => (
              <div className="word" key={item.id}>
                <h6 className={item ? "text-success" : "text-danger"}>
                  {item ? "Correct" : "Wrong"}
                </h6>
              </div>
            ))}
          </div>
          <div className="m-5">
            <h2 className="text-primary">Word</h2>
            {words.map((item) => {
              return (
                <div className="word" key={item.id + item.word}>
                  <h6>{item.word}</h6>
                </div>
              );
            })}
          </div>
          <div className="m-5">
            <h2 className="text-primary">Answer</h2>
            {words.map((item) => {
              return (
                <div className="answer" key={item.id + item.answer}>
                  <h6>{item.answer}</h6>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerLesson;
