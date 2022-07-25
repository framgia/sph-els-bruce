import BASEAPI from "./ApiBase";

const ResultApi = {
  postResult: ({ lesson_id, score }) => {
    const options = {
      method: "POST",
      url: "/create-result",
      data: {
        lesson_id,
        score,
      },
    };

    return BASEAPI.request(options);
  },
};

export default ResultApi;
