/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import Axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      await Axios.get("http://localhost:5000/api/recipes")
        .catch((err) => console.log(err.message))
        .then((res) => setRecipes(res.data));

      // console.log(recipes);
    };

    const fetchSavedRecipes = async () => {
      const userID = useGetUserID();
      await Axios.get(
        `http://localhost:5000/api/recipes/saved-recipes/ids/${userID}`
      )
        .catch((e) => console.log(e.message))
        .then((res) => {
          console.log(res.data);
          setSavedRecipes(res.data.savedRecipes);
        });
    };

    fetchRecipes();

    if (cookies.access_token) fetchSavedRecipes();
  }, []);

  const notify = () =>
    toast.info("You have not signed Yet!! Redirecting to Login", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const saveRecipe = async (recipeID) => {
    const userID = useGetUserID();
    console.log(userID);
    if (!userID) {
      notify();
      setTimeout(() => navigate("/auth"), 3000);
    } else {
      await Axios.put(
        "http://localhost:5000/api/recipes",
        { recipeID, userID },
        { headers: { authorization: cookies.access_token } }
      )
        .catch((e) => console.log(e.message))
        .then((res) => {
          console.log(res);
          setSavedRecipes(res.data.savedRecipes);
        });
    }
  };

  const isRecipeSaved = (recipeID) => savedRecipes.includes(recipeID);

  return (
    <div className="hero bg-base-200 bg-[url('https://images.pexels.com/photos/1813505/pexels-photo-1813505.jpeg?auto=compress&cs=tinysrgb&w=600')]">
      <div className="hero-content text-center w-[90%]">
        <div className="w-[140%]">
          <h1 className="text-5xl font-bold text-white p-4 bg-blend-saturation">
            Recipes
          </h1>
          <div className="flex flex-col items-center justify-center md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {recipes.map((recipe) => (
              <div
                className="card my-4 h-80 w-64 md:h-80 md:w-[85%] lg:h-80 lg:w-60 xl:h-96 xl:w-72 glass transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                key={recipe._id}
              >
                <figure>
                  <img src={recipe.imageURL} alt={recipe.name} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-md sm:text-md md:text-lg">
                    {recipe.name}
                  </h2>
                  <p className="text-xs sm:text-xs md:text-md">
                    {recipe.directions}
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary btn-xs md:btn-sm lg:btn-sm xl:btn-md mt-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                      onClick={() => saveRecipe(recipe._id)}
                      disabled={isRecipeSaved(recipe._id)}
                    >
                      {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

export default Home;
