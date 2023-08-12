/* eslint-disable no-unused-vars */
import { useState } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const notify = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyError = (msg) =>
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const login = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      notifyError("Please fill in all fields!");
      return;
    }

    await Axios.post("http://localhost:5000/api/auth/login", {
      username,
      password,
    })
      .catch((err) => console.log(err.response.data.message))
      .then((res) => {
        notify("Logged in successfully!");
        console.log(res);
        setCookies("access_token", res.data.token);
        window.localStorage.setItem("userID", res.data.userID);
        window.localStorage.setItem("imageURL", res.data.imageURL);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200" id="login">
      <div className="hero-content flex-col w-[90%] h-[90%]">
        <div className="text-center lg:text-left py-2">
          <h1 className="text-5xl font-bold">Login</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">
                <a
                  className="label-text-alt link link-hover"
                  onClick={() => {
                    document
                      .getElementById("register")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Create an account
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button onClick={login} className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Login;
