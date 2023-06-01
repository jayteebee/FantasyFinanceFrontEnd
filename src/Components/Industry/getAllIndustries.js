import React, {useState, useEffect} from 'react'
import { getAllIndustries } from "../../API/industryAPI";
import IndustryList from "./IndustryList";

const FetchAllIndustries = () => {
const [industries, setIndustries] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        const data = await getAllIndustries();
        setIndustries(data);
    }
    fetchData();
}, []);


  return <IndustryList industries={industries} />
}

export default FetchAllIndustries

