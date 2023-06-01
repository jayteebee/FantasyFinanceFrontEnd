import React, {useState, useEffect} from 'react'
import { getAllIndustries } from "../../API/industryAPI";
import IndustryList from "./IndustryList";

const FetchAllIndustries = () => {
const [industries, setIndustries] = useState(null);

useEffect(() => {
    getAllIndustries()
    .then(data => {
       setIndustries(data);
    })
    .catch(err => console.log("API Call Failed", err));
}, []);


  return <IndustryList industries={industries} />
}

export default FetchAllIndustries;

