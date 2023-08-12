/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { IoIosCloseCircle } from "react-icons/io";
import { useGetUserID } from "../hooks/useGetUserID";
import { useState } from "react";
import Axios from "axios";
import { useErrorToast, useSuccessToast } from "../hooks/useToast";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [imageURL, setImageURL] = useState(
    window.localStorage.getItem("imageURL") || ""
  );
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const userID = useGetUserID();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("imageURL");
    navigate("/");
    window.location.reload();
    //Scroll to login section
  };

  const updateProfile = async () => {
    await Axios.put(`${import.meta.env.VITE_SERVER_AUTH}/update-dp`, {
      userID: userID,
      profileDP: imageURL,
    })
      .catch((err) => {
        console.log(err);
        useErrorToast("Error updating profile!");
      })
      .then(async () => {
        // console.log(res);
        await useSuccessToast("Profile updated successfully!");
        window.localStorage.setItem("imageURL", imageURL);
        navigate("/");
      });
  };

  return (
    <div className="navbar bg-base-300 font-medium">
      <div className="navbar-start transition duration-500 ease-in-out transform hover:-translate-y-1">
        <a
          className="btn btn-ghost normal-case text-xl"
          onClick={() => {
            navigate("/");
          }}
        >
          recipeUI
        </a>
      </div>
      <div className="navbar-center lg:flex">
        <ul className="menu menu-horizontal space-x-2 transition duration-500 ease-in-out hover:scale-110 p-2">
          <li>
            <Link to="/" className=" transform hover:-translate-y-1">
              Home
            </Link>
          </li>

          {!cookies.access_token ? (
            <li>
              <Link to="/auth" className=" transform hover:-translate-y-1">
                Login/Register
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/create-recipe"
                  className=" transform hover:-translate-y-1"
                >
                  Create Recipe
                </Link>
              </li>
              <li>
                <Link
                  to="/saved-recipes"
                  className=" transform hover:-translate-y-1"
                >
                  Saved Recipes
                </Link>
              </li>
              <li>
                <Link
                  onClick={logout}
                  className=" transform hover:-translate-y-1"
                >
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {userID && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={window.localStorage.getItem("imageURL")} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  className="justify-between"
                  onClick={() => window.my_modal_1.showModal()}
                >
                  Update Profile Image
                </a>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Choose the picture</h3>
          <p className="py-4">Enter the URL of the image</p>
          <input
            type="text"
            placeholder="imageURL"
            className="input input-bordered"
            onChange={(e) => setImageURL(e.target.value)}
          />
          <br />
          <br />
          <button
            className="btn btn-sm btn-ghost btn-outline"
            onClick={updateProfile}
          >
            Update
          </button>
          <div className="modal-action">
            <button className="btn btn-circle">
              <IoIosCloseCircle size={40} />
            </button>
          </div>
        </form>
      </dialog>
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

export default Navbar;
