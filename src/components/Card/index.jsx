import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
  const navigate = useNavigate();

  const star = Array.from({ length: 5 }, (_, index) =>
    index < data.rating ? (
      <AiFillStar key={index} className="text-indigo-500" />
    ) : (
      <AiOutlineStar key={index} className="text-gray-400" />
    )
  );

  return (
    <div className="card bg-white rounded-lg shadow-lg p-6">
      <div className="w-full h-48 overflow-hidden">
        <img src={data.image} alt={data.name} className="h-full w-full object-cover" />
      </div>
      <h2 className="text-xl font-semibold mt-4 mb-2 text-gray-800">{data.name}</h2>
      <div className="flex items-center mb-2">{star}</div>
      <p className="text-sm text-gray-600 uppercase">
        {data.category} - ${data.price}
      </p>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <span
            className={`${
              data.isOpen ? "bg-green-500" : "bg-red-500"
            } w-3 h-3 rounded-full mr-1`}
          ></span>
          <p className="text-xs text-gray-600 uppercase">
            {data.isOpen ? "Open Now" : "Closed"}
          </p>
        </div>
        <button
          onClick={() => navigate(`detail/${data.id}`)}
          className="py-2 px-4 bg-indigo-500 text-white font-semibold uppercase rounded-md shadow hover:bg-indigo-600 transition duration-300"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Card;