import React, { useEffect, useState } from "react";
import styles from "./logInPage.module.css";
import { BasicInput } from "../../components/BasicInput/BasicInput";
import { PasswordInput } from "../../components/BasicInput/PasswordInput/PasswordInput";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";
import { logIn } from "../../redux/operations";
import { useDispatch } from "react-redux";

const LogInPage = ({ logInOpenPage, setlogInOpenPage }) => {
  // const [homeOpenPage, sethomeOpenPage] = useState();

  const dispatch = useDispatch();
  const userDataForLogin = {};

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(userDataForLogin);
    dispatch(logIn(userDataForLogin));
  };

  const handleChange = ({ target: { name, value } }) => {
    userDataForLogin[name] = value;
  };

  return (
    <div className={styles.container}>
      <div>
        <img
          src={require("../../images/logIn/logo.svg")}
          alt="logo"
          className={styles.logo}
        />
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>C возвращением!</h1>
          <p className={styles.text}>
            Введите свои данные, чтобы <br /> продолжить использовать наше
            приложение
          </p>
          <BasicInput
            type="text"
            forLabel="Логин"
            id="Логин"
            labelText="Логин"
            name="email"
            labelWidth="120px"
            inputWidth="345px"
            marginBottom="15px"
            handleChange={handleChange}
          />
          {/* <BasicInput
            type="password"
            forLabel="password-input"
            id="password-input"
            labelText="Пароль"
            name="password"
            labelWidth="120px"
            inputWidth="345px"
            marginBottom="40px"
            handleChange={handleChange}
          /> */}
          <PasswordInput
            type="password"
            forLabel="password-input"
            id="password-input"
            labelText="Пароль"
            name="password"
            labelWidth="120px"
            inputWidth="345px"
            marginBottom="40px"
            handleChange={handleChange}
          />
          <div className={styles.buttonContaineer}>
            <button type="Submit" className={styles.logInButton}>
              Войти
            </button>
            <button type="button" className={styles.buttonGoogle}>
              Войти с помощью Google
            </button>
            <button type="button" className={styles.buttonFacebook}>
              Войти с помощью Facebook
            </button>
            <Link
              to="/"
              className={styles.registerButton}
              onClick={() => setlogInOpenPage(false)}
            >
              На главную
            </Link>
            <p className={styles.formText}>
              By signing up you agree to our Terms & Conditions
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LogInPage;
