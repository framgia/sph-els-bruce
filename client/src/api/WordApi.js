import BASEAPI from "./ApiBase";

const WordApi = {
  createWord: ({ word, choiceA, choiceB, choiceC, choiceD, answer }) => {
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
      },
    };

    return BASEAPI.request(options);
  },
};

export default WordApi;
