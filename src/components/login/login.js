import { React, useState } from "react";
import axios from "axios";
import "./login.css";

const sessionsUrl = process.env.REACT_APP_BACKEND_URL
  ? `${process.env.REACT_APP_BACKEND_URL}/sessions`
  : "http://localhost:9000/sessions";

const redirectUrl = process.env.REACT_APP_BACKEND_URL
  ? process.env.REACT_APP_URL
  : "http://localhost:3000";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsername = ({ target }) => {
    setUsername(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleEnter = (event) => {
    const buttonEl = document.querySelector("#login-button");
    if (event.key === "Enter") buttonEl.click();
  };

  const handleSubmit = () => {
    axios
      .post(
        sessionsUrl,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data);
          window.location.href = redirectUrl;
        } else {
          throw res;
        }
      })
      .catch((err) => {
        setError(err.response.statusText);
      });
  };

  return (
    <div className="login">
      <h1>Log In</h1>
      <div className="border">
        <input
          placeholder="Username"
          onChange={handleUsername}
          onKeyDown={handleEnter}
        ></input>
        <br></br>
        <input
          type="password"
          placeholder="Password"
          onChange={handlePassword}
          onKeyDown={handleEnter}
        ></input>
        <br></br>
        <button id="login-button" onClick={handleSubmit}>
          Log in
        </button>
        <p className="error-message">{error}</p>
      </div>
    </div>
  );
}
