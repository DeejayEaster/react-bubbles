import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

const LoginForm = props => {
  const [name, setName] = useState({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const changeHandler = event => {
    event.preventDefault();
    setName({ ...name, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  const login = e => {
    e.preventDefault();
    setName({ ...name, isLoading: true });
    axios
      .post("http://localhost:5000/api/login", name)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
      })
      .catch(err => console.log(err.response));
    props.history.push("/protected");
  };

  return (
    <div className="login-card">
      <form
        className="login-modal"
        onSubmit={event => handleSubmit(event)}
        onKeyDown={props.closeLoginHandler2}
        tabIndex="0"
      >
        <h1 className="title">Welcome Back</h1>
        <p className="login-inputs">
          <label>
            Username:
            <input
              className="input-forms"
              type="text"
              name="username"
              onChange={changeHandler}
              value={name.username}
            />
          </label>
        </p>

        <p className="login-inputs">
          <label>
            Password:
            <input
              className="input-forms"
              type="password"
              name="password"
              onChange={changeHandler}
              value={name.password}
            />
          </label>
        </p>
        <button type="submit" className="login-button" onClick={login}>
          Login
        </button>
      </form>
    </div>
  );
};

export default withRouter(LoginForm);
