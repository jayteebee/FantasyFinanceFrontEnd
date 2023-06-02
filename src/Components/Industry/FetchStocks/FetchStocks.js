import React, {useState, useEffect} from 'react'
import { getAllStocksFromIndustry } from "../../../API/industryAPI";

const FetchAllStocksFromIndustry = ({industry}) => {
const [industryStocks, setIndustryStocks] = useState(null);


// Need to add in the overview API call from fundamental data
// needs to be called within the useEffect block and have userID passed as params
// then need to assign the API data to the stock schema in the return

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
            <div key={stock.id}>
            {stock.company_name}
            &nsbp | &nbsp;
            {stock.symbol}
            </div>
        )) : <div>No Stocks Found</div>}
  </div>
)}

export default FetchAllStocksFromIndustry;

