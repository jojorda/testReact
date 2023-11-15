import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import Card from "../Card";

const MainSection = () => {
  const [limit, setLimit] = useState(8);
  const [isLoading, setLoading] = useState(false);
  const { state, handleFunction } = useContext(Context);
  const { data, value, priceValue, fetchRestaurantStatus } = state;
  const { getRestaurants } = handleFunction;

  useEffect(() => {
    getRestaurants();
  }, [value, priceValue]);

  const handleLoad = () => {
    setLoading(true);

    setTimeout(() => {
      setLimit((prevLimit) => prevLimit + 4);
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl text-center mt-6 mb-8">Discover Restaurants</h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {fetchRestaurantStatus ? (
          <div className="flex items-center justify-center h-auto">
            <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 rounded-full"></div>
          </div>
        ) : (
          data
            .filter((item, index) => item && index < limit)
            .map((item) => <Card data={item} key={item.id} />)
        )}
      </div>
      {!fetchRestaurantStatus && (
        <div className="flex justify-center mt-8">
          {isLoading ? (
            <div className="animate-spin h-8 w-8 border-t-4 border-blue-500 rounded-full"></div>
          ) : (
            <button
              className="py-2 px-4 bg-blue-300 text-white font-semibold uppercase rounded-md shadow hover:bg-blue-600 transition duration-300"
              onClick={handleLoad}
            >
              Load More
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default MainSection;

