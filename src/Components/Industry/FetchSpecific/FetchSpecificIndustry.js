import React, {useState, useEffect} from 'react'
import { getSpecificIndustry } from "../../../API/industryAPI";
import SpecificIndustry from "./SpecificIndustry";

const FetchSpecificIndustries = ({industries}) => {
const [specificIndustry, setSpecificIndustry] = useState(null);
const [input, setInput] = useState("");



const handleChange = (e) => {
    setInput(e.target.value);
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (!industries) {
      return
    }

    const industry = industries.find(industry => industry.name === input);
    if (industry) {
      getSpecificIndustry(industry.id)
      .then(data => {
    setSpecificIndustry(data);
    setInput("");
  })
  .catch(err => console.log("API Call Failed", err));
    } else {
      console.log(`No industry found with the name "${input}"`);
    }  
}

  return(
    <form onSubmit={handleSubmit}>
        <input type="text" value={input} placeholder="Search Industry" onChange={handleChange} />
        <input type="submit" value="Submit" />
        <SpecificIndustry specificIndustry={specificIndustry} />
    </form>
    );
};

export default FetchSpecificIndustries;





// if the user input is equal to one of the industry names, then take the ID  of that industry and pass it as the input being sent to the API
// if (input === industries.name) {
//   let id = industries.id;
// }