import React, {useState, useEffect} from 'react'
import { getAllIndustries } from "../../../API/industryAPI";
import IndustryList from "./IndustryList";
import FetchSpecificIndustry from "../FetchSpecific/FetchSpecificIndustry";

const FetchAllIndustries = () => {
const [industries, setIndustries] = useState(null);

useEffect(() => {
    getAllIndustries()
    .then(data => {
       setIndustries(data);
    })
    .catch(err => console.log("API Call Failed", err));
}, []);

  return (
  <div>
  <IndustryList industries={industries} />
  <FetchSpecificIndustry industries={industries} />
  </div>
)}

export default FetchAllIndustries;

