import { useState } from "react";
import React from "react";
import WordApi from "../../../api/WordApi";
import swal from "sweetalert";

const AddWord = () => {
  const [inputWord, setInputWord] = useState({
    word: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    answer: "",
  });
  const [error_list, setError_list] = useState([]);

  const handleInput = (e) => {
    e.preventDefault();
    setInputWord({ ...inputWord, [e.target.name]: e.target.value });
  };

  const addWord = (e) => {
    e.preventDefault();

    const data = {
      word: inputWord.word,
      choiceA: inputWord.choiceA,
      choiceB: inputWord.choiceB,
      choiceC: inputWord.choiceC,
      choiceD: inputWord.choiceD,
      answer: inputWord.answer,
    };

    WordApi.createWord(data)
      .then((res) => {
        swal("Success", res.data.message, "success");
        setTimeout(() => {}, 2000);
      })
      .catch(({ response }) => {
        setError_list(response.data);
      });
  };

  return (
    <div className="container">
      <form onSubmit={addWord}>
        <div className="row">
          <h1 className="text-lg-start">Add word</h1>
          <div className="col form-group mt-5">
            <h4 className="text-lg-start">Word</h4>
            <input
              type="text"
              className="form-control  w-75"
              onChange={handleInput}
              name="word"
            ></input>
            <span className="text-danger">{error_list.word}</span>

            <h4 className="text-lg-start">Correct Answer</h4>
            <input
              type="text"
              className="form-control  w-75"
              onChange={handleInput}
              name="answer"
            ></input>
            <span className="text-danger">{error_list.answer}</span>
          </div>

          <div className="col form-group mt-5">
            <h4 className="text-lg-start">Choices</h4>
            <input
              type="text"
              name="choiceA"
              className="form-control  w-75 "
              onChange={handleInput}
              placeholder="Choice A"
            ></input>
            <span className="text-danger">{error_list.choiceA}</span>
            <input
              type="text"
              name="choiceB"
              className="form-control  w-75 mt-2"
              onChange={handleInput}
              placeholder="Choice B"
            ></input>
            <span className="text-danger">{error_list.choiceB}</span>
            <input
              type="text"
              name="choiceC"
              className="form-control  w-75 mt-2"
              onChange={handleInput}
              placeholder="Choice C"
            ></input>
            <span className="text-danger">{error_list.choiceC}</span>
            <input
              type="text"
              name="choiceD"
              className="form-control  w-75 mt-2"
              onChange={handleInput}
              placeholder="Choice D"
            ></input>
            <span className="text-danger">{error_list.choiceD}</span>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-5">
          Add word
        </button>
      </form>
    </div>
  );
};

export default AddWord;
