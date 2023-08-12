/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import Axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      const userID = useGetUserID();
      await Axios.get(
        `http://localhost:5000/api/recipes/saved-recipes/${userID}`
      )
        .catch((e) => console.log(e.message))
        .then((res) => {
          console.log(res.data);
          setSavedRecipes(res.data.savedRecipes);
        });
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div className="hero min-h-[89.9vh] bg-base-200 bg-[url('https://images.pexels.com/photos/1813505/pexels-photo-1813505.jpeg?auto=compress&cs=tinysrgb&w=600')]">
      <div className="hero-content text-center w-[90%]">
        <div className="w-[140%]">
          <h1 className="text-5xl font-bold text-white p-4 bg-blend-saturation">
            Saved Recipes
          </h1>
          <div className="flex flex-col items-center justify-center md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {savedRecipes.map((recipe) => (
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
                  <div className="card-actions justify-end"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;
