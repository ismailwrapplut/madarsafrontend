import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { Button, TextField, Link } from "@material-ui/core";
import { withRouter } from "./utils";
import axios from "axios";
import { Audio } from 'react-loader-spinner'
import { redirect, useNavigate } from "react-router-dom";
import Loader from "react-js-loader";

const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);


const Login = (props) => {
  const [state, setState] = useState({
    username: "",
    password: "",
    loading:false
  });
const navigate=useNavigate()
  const { username, password } = state;

  const onChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token") !== null;

    if (isAuthenticated) {
      navigate("/dashboard")
    }else{
      navigate("/")
    }
  }, []);

  const login = () => {
    setState({
      loading:true
    })
    const pwd = bcrypt.hashSync(password, salt);

    axios
      .post("https://madarsabackend.onrender.com/login", {
        username: username,
        password: pwd,
      })
      .then((res) => {
        setState({
          loading:false
        })
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.id);
        props.navigate("/dashboard");
      })
      .catch((err) => {
        setState({
          loading:false
        })
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          swal({
            text: err.response.data.errorMessage,
            icon: "error",
            type: "error",
          });
        }
      });
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <div>
        <h2>Login</h2>
      </div>

      <div>
        <TextField
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="username"
          value={username}
          onChange={onChange}
          placeholder="User Name"
          required
        />
        <br />
        <br />
        <TextField
          id="standard-basic"
          type="password"
          autoComplete="off"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <br />
        <br />
        {state.loading===false?
          <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="small"
          disabled={username === "" && password === ""}
          onClick={login}
        >
          Login
        </Button>
          
          
          
          :<div className={"item"}>
          <Loader type="spinner-cub" bgColor={"white"} color={"blue"} title={"loading"} size={50} />
      </div>}
       
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       
      </div>
    </div>
  );
};

export default withRouter(Login);