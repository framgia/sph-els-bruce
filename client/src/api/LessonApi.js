import BASEAPI from "./ApiBase";

const LessonApi = {
  getQuestion: (id) => {
    const options = {
      method: "GET",
      url: `/view-lesson/${id}`,
    };
    return BASEAPI.request(options);
  },
};

export default LessonApi;
