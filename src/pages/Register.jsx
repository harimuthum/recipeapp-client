import { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const register = async (e) => {
    e.preventDefault();

    //Validation for username and password
    if (username.length == 0 || password.length == 0) {
      notifyError("Fields cannot be empty");
      return;
    }

    Axios.post("http://localhost:5000/api/auth/register", {
      username,
      password,
    })
      .catch((err) => console.log(err))
      .then((res) => {
        setUsername("");
        setPassword("");
        document.getElementsByName("username")[0].value = "";
        document.getElementsByName("password")[0].value = "";
        notify(res.data.message);
        setTimeout(() => {
          document.getElementById("login").scrollIntoView({
            behavior: "smooth",
          });
        }, 2000);
      });
  };

  return (
    <div className="hero min-h-screen bg-gray-300" id="register">
      <div className="hero-content flex-col  w-[90%] h-[90%]">
        <div className="text-center lg:text-left py-2">
          <h1 className="text-5xl font-bold">Register</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                name="username"
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
                name="password"
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
                      .getElementById("login")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Have an account
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button onClick={register} className="btn btn-primary">
                Register
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

export default Register;
