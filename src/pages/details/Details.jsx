import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobalContext } from '../../context';

const Details = () => {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorite,
    setErrorMsg,
  } = useContext(GlobalContext);

  async function getRecipeDetails() {
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await res.json();
      if (data) {
        setRecipeDetailsData(data?.data?.recipe);
        console.log(recipeDetailsData);
      }
    } catch (e) {
      setErrorMsg(e.message);
    }
  }

  useEffect(() => {
    getRecipeDetails();
  }, []);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 ">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.image_url}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetailsData?.title}
        </h3>
        <div className="flex gap-6">
          <button
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
            onClick={() => {
              handleAddToFavorite(recipeDetailsData);
            }}
          >
            {favoritesList?.findIndex(
              (item) => item.id === recipeDetailsData?.id
            ) !== -1
              ? 'Remove From Favorites'
              : 'Add to Favorites'}
          </button>
          <button
            onClick={() => window.open(`${recipeDetailsData.source_url}`)}
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
          >
            Source
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-black">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3 mt-3">
            {recipeDetailsData?.ingredients?.map((ingredient) => (
              <li key={ingredient?.description + ingredient?.quantity}>
                <div className="flex gap-3">
                  <div>
                    <span className="text-xl font-bold text-cyan-800">
                      {ingredient?.quantity}{' '}
                    </span>
                    <span className="text-xl font-bold text-cyan-800">
                      {ingredient?.unit}
                    </span>
                  </div>

                  <span className="text-xl text-gray-800 ms-4">
                    {ingredient?.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
