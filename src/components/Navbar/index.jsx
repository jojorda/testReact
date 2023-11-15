import React, { useContext } from "react";
import Select from "react-select";
import {Context } from "../../context/Context";
import { AnimatePresence, motion } from "framer-motion";

const CustomNavbar = () => {
  const { state } = useContext(Context);
  const { category, value, setValue, price, priceValue, setPriceValue } = state;

  const clearFilters = () => {
    setValue("");
    setPriceValue("");
  };

  return (
    <section className="container mx-auto flex items-center justify-between border-b border-gray-300 py-4 px-12 my-10 bg-white rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Refine By:</span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border-b border-gray-400 pb-1">
            <input
              type="radio"
              name="open"
              id="radio"
              className="form-radio text-blue-500"
            />
            <label htmlFor="radio" className="ml-1 text-gray-500">
              Open Now
            </label>
          </div>
          <Select
            name="Price"
            placeholder="Price"
            isClearable={true}
            options={price}
            onChange={(e) => setPriceValue(e)}
            value={priceValue}
            className="w-auto lg:w-[200px] bg-gray-100 text-gray-700 rounded-lg"
            classNamePrefix="react-select"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#3B82F6",
                primary25: "#BFDBFE",
              },
            })}
            components={{
              DropdownIndicator: () => null, 
            }}
            isSearchable={false}
            styles={{
              control: (provided) => ({
                ...provided,
                borderRadius: "0.5rem",
                boxShadow: "none",
                height: "38px",
              }),
              menu: (provided) => ({
                ...provided,
                borderRadius: "0.5rem",
                boxShadow: "0 2px 8px #3B82F6",
              }),
              option: (provided, state) => ({
                ...provided,
                background: state.isSelected ? "#3B82F6" : "transparent",
                color: state.isSelected ? "#FFF" : "#4B5563",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  background: "#BFDBFE",
                },
              }),
            }}
          />
          <Select
            name="Categories"
            placeholder="Categories"
            isClearable={true}
            options={category}
            onChange={(e) => setValue(e)}
            value={value}
            className="w-auto lg:w-[200px] bg-gray-100 text-gray-700 rounded-lg"
            classNamePrefix="react-select"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#3B82F6",
                primary25: "#BFDBFE",
              },
            })}
            components={{
              DropdownIndicator: () => null, 
            }}
            isSearchable={false}
            styles={{
              control: (provided) => ({
                ...provided,
                borderRadius: "0.5rem",
                boxShadow: "none",
                height: "38px",
              }),
              menu: (provided) => ({
                ...provided,
                borderRadius: "0.5rem",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }),
              option: (provided, state) => ({
                ...provided,
                background: state.isSelected ? "#3B82F6" : "transparent",
                color: state.isSelected ? "#FFF" : "#4B5563",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  background: "#BFDBFE",
                },
              }),
            }}
          />
        </div>
      </div>
      <div className="flex items-center">
        <AnimatePresence>
          {(value || priceValue) && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="py-2 px-6 bg-blue-500 text-sm text-white hover:bg-blue-600 duration-200 rounded-lg"
              onClick={clearFilters}
            >
              CLEAR ALL
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CustomNavbar;