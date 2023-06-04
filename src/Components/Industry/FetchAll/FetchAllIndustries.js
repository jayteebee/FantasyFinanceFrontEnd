import React, { useState, useEffect } from "react";
import { getAllIndustries } from "../../../API/industryAPI";
import IndustryList from "./IndustryList";
import FetchSpecificIndustry from "../FetchSpecific/FetchSpecificIndustry";
import FetchStocks from "../FetchStocks/FetchStocks";

const FetchAllIndustries = ({ onIndustrySelect }) => {
  const [industries, setIndustries] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  useEffect(() => {
    getAllIndustries()
      .then((data) => {
        setIndustries(data);
      })
      .catch((err) => console.log("API Call Failed", err));
  }, []);

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
  };

  return (
    <div>
      <IndustryList
        industries={industries}
        onIndustrySelect={onIndustrySelect}
      />
      <FetchSpecificIndustry
        industries={industries}
        onIndustrySelect={onIndustrySelect}
      />
      <FetchStocks industry={selectedIndustry} />
    </div>
  );
};

export default FetchAllIndustries;
