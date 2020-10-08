import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./userData.css";
import { logOut } from "../../../redux/operations";
import FindAvatarById from "../../../helpers/FindAvatarById";

export const UserData = () => {
  const subscriptionLevel = useSelector(
    (state) => state.subscriptionLevel.plan
  );

  console.log(subscriptionLevel);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const clickTologOut = () => {
    dispatch(logOut());
  };
  return (
    <>
      <div className="leftSideBar-userData">
        <Link to="/make-it-habit/profile" className="leftSideBar-user-link">
          <div className="leftSideBar-user-avatar">{FindAvatarById()}</div>
          <p className="leftSideBar-user-name">
            {userInfo.firstName && userInfo.lastName
              ? `${userInfo.firstName} ${userInfo.lastName}`
              : "NickName"}
          </p>
        </Link>
        <div
          className={
            subscriptionLevel === "Noob"
              ? "Noob"
              : subscriptionLevel === "Basic"
              ? "Basic"
              : subscriptionLevel === "Standart"
              ? "Standart"
              : subscriptionLevel === "Premium"
              ? "Premium"
              : subscriptionLevel === "Ultra"
              ? "Ultra"
              : subscriptionLevel === "Текущий план не выбран"
              ? "userData-subscriptionArea"
              : ""
          }
        >
          <span className="userData-subscriptionText">{subscriptionLevel}</span>
        </div>
        <button
          type="button"
          onClick={clickTologOut}
          className="leftSideBar-user-button"
        >
          <img
            src={require("../../../images/close/logout.svg")}
            className="log-out-img"
          />
        </button>
      </div>
    </>
  );
};
