import React, {useState, useEffect} from 'react'
import { getAllStocksFromIndustry } from "../../../API/industryAPI";

const FetchAllStocksFromIndustry = ({industry}) => {
const [industryStocks, setIndustryStocks] = useState(null);

useEffect(() => {
    const industryName = industry;
if (industryName) {
    getAllStocksFromIndustry(industryName.id)
    .then(data => {
        setIndustryStocks(data);
    })
    .catch(err => console.log("API Call Failed", err));
} else {
    console.log("No Industry Selected");
}

}, [industry]);
console.log(industryStocks);
  return (
  <div>
        {industryStocks ? industryStocks.map(stock => (
            <div key={stock.id}>{stock.company_name}</div>
        )) : <div>No Stocks Found</div>}
  </div>
)}

export default FetchAllStocksFromIndustry;

