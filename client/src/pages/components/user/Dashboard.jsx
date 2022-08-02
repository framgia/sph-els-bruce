import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import AdminApi from "../../../api/AdminApi";
import UserApi from "../../../api/UserApi";
import avatar from "../../../assets/img/dummy.png";
import moment from "moment";

const Dashboard = () => {
  const navigate = useNavigate();
  if (!UserApi.isLogin) {
    window.location = "/";
  }
  if (AdminApi.isAdmin() === "admin@gmail.com") {
    window.location = "/admin/dashboard";
  }

  const [user, setUser] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    UserApi.getuser().then((res) => {
      setUser(res.data.user[0]);
      setResult(res.data.result);
    });
  }, []);

  let lessonCount = result.length;

  const [gscore, setGscore] = useState();
  useEffect(() => {
    let score = 0;
    result.map((item, index) => {
      item.score.filter((item) => {
        if (item === true) {
          score++;
        }
      });
      setGscore(score);
    });
  }, [lessonCount]);

  const wordsLearn = () => {
    navigate("/words-learned", {
      state: { user, result, gscore },
    });
  };

  return (
    <div>
      <div className="container">
        <div className="d-flex flex-100">
          <div className="profile">
            <h4>Dashboard</h4>
            <div className="d-flex d-flex align-items-center justify-content-center">
              <div className="avatar">
                <img src={avatar} alt="..." className="rounded avatar" />
              </div>
              <div className="details">
                <h5 className="name">
                  `{user.lastname}, {user.firstname}`
                </h5>
                <div className="words ">
                  Learned{" "}
                  <span className="text-primary ">
                    <a className="pe-auto" onClick={wordsLearn}>
                      {gscore} words
                    </a>
                  </span>
                </div>
                <div className="lessons">
                  Learned{" "}
                  <span className="text-primary">{lessonCount} lessons</span>
                </div>
              </div>
            </div>
          </div>
          <div className="activity text-lg-start">
            <h4>Activities</h4>
            <hr />

            {result.map((item, index) => {
              let total = item.score.length;
              let actScore = 0;

              item.score.filter((item) => {
                if (item) {
                  actScore++;
                }
              });
              return (
                <div className="d-flex align-items-center" key={index}>
                  <div className="avatar">
                    {" "}
                    <img src={avatar} alt="..." className="rounded avatar" />
                  </div>
                  <div className="d-flex flex-column">
                    <div className="description">
                      You learned {actScore} of {total} words in{" "}
                      <span className="text-primary">
                        {" "}
                        {item.lessons[0].name}
                      </span>
                    </div>

                    <div className="day_ago">
                      {moment(item.created_at).fromNow()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
