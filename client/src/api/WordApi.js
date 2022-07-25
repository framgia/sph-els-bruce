import BASEAPI from "./ApiBase";

const WordApi = {
  createWord: ({
    word,
    choiceA,
    choiceB,
    choiceC,
    choiceD,
    answer,
    lesson_id,
  }) => {
    const options = {
      method: "POST",
      url: "/admin/create-word",
      data: {
        word,
        choiceA,
        choiceB,
        choiceC,
        choiceD,
        answer,
        lesson_id,
      },
    };

    return BASEAPI.request(options);
  },
};

export default WordApi;
