import React, { useState, useEffect } from "react";

const FetchSpecificIndustries = ({ industries, onIndustrySelect }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!industries) {
      return;
    }

    const industry = industries.find((industry) => industry.name === input);
    if (industry) {
      onIndustrySelect(industry);
      setInput("");
    } else {
      console.log(`No industry found with the name "${input}"`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="Search Industry"
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default FetchSpecificIndustries;
