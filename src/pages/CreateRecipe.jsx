/* eslint-disable no-unused-vars */
import Axios from "axios";
import { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    directions: "",
    imageURL: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const notify = () =>
    toast.success("Recipe Created!!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
    // console.log(recipe);
  };

  const handleIngredientChange = (e, idx) => {
    // const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = e.target.value;
    setRecipe({
      ...recipe,
      ingredients,
    });
    // console.log(recipe);
  };

  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, ""],
    });
    // console.log(recipe);
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(recipe);

    await Axios.post(import.meta.env.VITE_SERVER_RECIPE, recipe, {
      headers: { authorization: cookies.access_token },
    })
      .catch((err) => console.log(err))
      .then((res) => {
        console.log(res);
        notify();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
  };

  //   console.log(recipe);
  return (
    <div className="min-h-screen flex flex-col items-center bg-base-200">
      <div className="text-center">
        <h1 className="text-5xl font-bold py-8">Create Recipe</h1>
      </div>
      <div className="card w-[55%] shadow-2xl bg-base-100 mb-16">
        <div className="card-body">
          <div className="form-control">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered"
              onChange={handleChange}
            />
          </div>
          <div className="form-control flex items-center justify-center p-4">
            {recipe.ingredients.map((ingredient, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  name="ingredients"
                  placeholder="ingredients"
                  className="input input-bordered w-[80%] m-1"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
              );
            })}

            <button
              className="btn btn-base my-2"
              onClick={addIngredient}
              type="button"
            >
              Add Ingredient
            </button>
          </div>
          <div className="form-control">
            <textarea
              type="text"
              name="directions"
              placeholder="Directions"
              className="textarea textarea-bordered"
              cols="30"
              rows="5"
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="imageURL"
              placeholder="Image URL"
              className="input input-bordered"
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <input
              type="number"
              name="cookingTime"
              placeholder="Cooking Time"
              className="input input-bordered"
              onChange={handleChange}
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={submit}>
              Add Recipe
            </button>
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

export default CreateRecipe;
