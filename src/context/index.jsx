import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParams, setSearchParams] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState(null);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [favoritesList, setFavoritesList] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');

    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  // to save the favorite items in the local storage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoritesList));
  }, [favoritesList]);

  const navigate = useNavigate();

  // handle submit on Search
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParams}`
      );
      const data = await res.json();

      // if there is data set it to state, clear the loading, clear the search field and navigate to home screen
      if (data) {
        setRecipeList(data.data?.recipes);
        setLoading(false);
        setSearchParams('');
        navigate('/');
      }
    } catch (e) {
      setErrorMsg(e.message);
      setLoading(false);
      setSearchParams('');
    }
  }

  function handleAddToFavorite(getCurrentItem) {
    let cpyFavoritesList = [...favoritesList];
    const index = cpyFavoritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      cpyFavoritesList.push(getCurrentItem); // to add it to the array
    } else {
      cpyFavoritesList.splice(index); // to remove the item for the array if already exists
    }

    setFavoritesList(cpyFavoritesList);

    /* Another way to solve it 
  
    if (favoritesList.indexOf(getCurrentItem) === -1) {
    setFavoritesList(oldItems =>  [...oldItems,getCurrentItem]  )
    }
    */
    console.log(favoritesList);
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParams,
        loading,
        recipeList,
        setSearchParams,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
