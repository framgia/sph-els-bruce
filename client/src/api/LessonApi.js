import BASEAPI from "./ApiBase";

const LessonApi = {
  getQuestion: (id) => {
    const options = {
      method: "GET",
      url: `/view-lesson/${id}`,
    };
    return BASEAPI.request(options);
  },

  createLesson: ({ category_id, name }) => {
    const options = {
      method: "POST",
      url: "admin/create-lesson",
      data: {
        category_id,
        name,
      },
    };
    return BASEAPI.request(options);
  },
  getLessonId: (id) => {
    const options = {
      method: "GET",
      url: `admin/get-lesson/${id}`,
    };
    return BASEAPI.request(options);
  },
};

export default LessonApi;
