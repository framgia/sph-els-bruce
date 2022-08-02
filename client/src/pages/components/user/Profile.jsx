import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import UserApi from "../../../api/UserApi";
import avatar from "../../../assets/img/dummy.png";

const Profile = () => {
  const [user, setUser] = useState([]);
  const [result, setResult] = useState([]);
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    UserApi.getUser().then((res) => {
      setUser(res.data.user[0]);
      setResult(res.data.result);
      setFollower(res.data.followers);
      setFollowing(res.data.following);
    });
  }, []);

  let lessonCount = result.length;

  const [gscore, setGscore] = useState();
  const navigate = useNavigate();
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
    <div className="container mt-5">
      <div className="d-flex  justify-content-lg-around">
        <div className="left-40">
          <div className="d-flex flex-column">
            <div className="avatar">
              <img className="image" src={avatar} alt="" />
            </div>
            <div className="name">
              <h5>{user.lastname + ", " + user.firstname}</h5>
            </div>
            <hr />
            <div className="follow d-flex justify-content-md-around">
              <div className="followers flex-column">{follower} Follower</div>
              <div className="following  flex-column">
                {following} Following
              </div>
            </div>
            <button className="btn btn-primary">Follow</button>
            <div className="words ">
              Learned{" "}
              <span className="text-primary ">
                <a className="pe-auto" onClick={wordsLearn}>
                  {gscore} words
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="right-60">
          <div className="container">
            <h4 className="text-lg-start">Activities</h4>
            <hr />

            <div className="d-flex align-items-center justify-content-lg-around">
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
