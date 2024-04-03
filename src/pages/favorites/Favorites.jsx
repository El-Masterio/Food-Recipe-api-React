import React, { useContext } from 'react';
import { GlobalContext } from '../../context';
import { RecipieItem } from '../../components';

const Favorites = () => {
  const { favoritesList, loading } = useContext(GlobalContext);

  if (loading) {
    return <div>Getting Flavors, Hang on...</div>;
  }

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map((item) => <RecipieItem key={item.id} item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing is Added in favorites
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
