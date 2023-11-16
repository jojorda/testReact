import axios from "axios";
import { createContext, useState } from "react";

export const Context = createContext();

export const Provider = (props) => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState();
  const [value, setValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [price, setPrice] = useState([
    { label: "Cheapest", value: "Cheapest" },
    { label: "Most Expensive", value: "Most Expensive" },
  ]);
  const [fetchRestaurantStatus, setFetchRestaurantStatus] = useState(false);

  const getRestaurants = async () => {
    setFetchRestaurantStatus(true);
    try {
      const res = await axios.get(
        "https://my-json-server.typicode.com/FaaizRamaza/Restaurant-api/restaurant"
      );

      let option = res.data.map((data) => {
        return {
          label: data.category,
          value: data.category,
        };
      });

      const duplicatedDelete = [
        ...new Map(
          option.map((val) => [JSON.stringify([val.label, val.name]), val])
        ).values(),
      ];

      setCategory(duplicatedDelete);

      let filter = value
        ? res.data.filter((val) => val.category === value.label)
        : res.data;

      if (priceValue) {
        if (priceValue.label === "Most Expensive") {
          
          let sorting = filter.sort(
            (a, b) => parseFloat(b.price) - parseFloat(a.price)
          );
          setData(sorting);
        } else if (priceValue.label === "Cheapest") {
      
          let sorting = filter.sort(
            (a, b) => parseFloat(a.price) - parseFloat(b.price)
          );
          setData(sorting);
        }
      } else {
        setData(filter);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetchRestaurantStatus(false);
    }
  };

  let state = {
    data,
    setData,
    category,
    setCategory,
    value,
    setValue,
    price,
    setPrice,
    priceValue,
    setPriceValue,
    fetchRestaurantStatus,
    setFetchRestaurantStatus,
  };

  let handleFunction = {
    getRestaurants,
  };
  return (
    <Context.Provider value={{ state, handleFunction }}>
      {props.children}
    </Context.Provider>
  );
};
