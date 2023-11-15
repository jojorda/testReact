import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const [restaurant, setRestaurant] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      try {
        const response = await axios.get(
          `https://my-json-server.typicode.com/FaaizRamaza/Restaurant-api/restaurant/${id}`
        );
        setRestaurant(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchRestaurantDetail();
  }, []);

  const renderStarRating = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const StarIcon = i < restaurant?.rating ? AiFillStar : AiOutlineStar;
      stars.push(
        <StarIcon
          key={i}
          className={`text-blue-500 ${
            i < restaurant?.rating ? "fill-current" : "fill-current"
          }`}
        />
      );
    }

    return stars;
  };

  return (
    <section className="bg-white min-h-screen text-gray-800">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="container mx-auto px-4">
            <div className="flex items-center mt-12">
              <BsArrowLeft className="mr-2 text-gray-300" />{" "}
              <Link to="/" className="text-black hover:text-gray-400">
                Back To Home
              </Link>
            </div>
            <div className="flex flex-wrap my-4 md:my-12">
              <div className="w-full md:hidden px-4">
                <h2 className="text-3xl font-semibold truncate">
                  {restaurant?.name}
                </h2>
                <span className="text-xl text-gray-300">
                  $ {restaurant?.price}
                </span>
              </div>

              <div className="w-full md:w-1/2 px-4">
                <div className="relative rounded-lg h-full overflow-hidden">
                  <img
                    src={restaurant?.image}
                    alt={restaurant?.name}
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="flex-1 px-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <h2 className="text-3xl font-semibold text-gray-800">
                      {restaurant?.name}
                    </h2>
                    <div className="flex mt-4 space-x-1">
                      {renderStarRating()}
                    </div>
                    <p className="text-xl pt-4 text-gray-800">
                      $ {restaurant?.price}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-end">
                    <div className="inline-flex space-x-1 items-center">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          restaurant?.isOpen
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      <p className="text-sm uppercase">
                        {restaurant?.isOpen ? (
                          <span className="text-green-500">Open Now</span>
                        ) : (
                          <span className="text-red-500">Closed</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="my-8" />

                <h6 className="text-xl font-semibold mb-4">Description</h6>
                <p className="text-xl leading-7 mb-6">
                  {restaurant?.description}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Detail;