import React, {useState, useEffect} from 'react'
import { getAllUserHoldings } from '../../API/holdingAPI'


const FetchAllHoldings = ({stockPurchased}) => {
    const [holdings, setHoldings] = useState(null)
    const userId = window.localStorage.getItem("userID")

useEffect(() => {
    getAllUserHoldings(userId)
    .then(data => setHoldings(data))
    .catch(err => console.log("API Call Failed", err));
}, [stockPurchased])

  return (
    <div className="scrollable-div">
   
    
    {holdings ? holdings.map(holding => (
        <div key={holding.id}>
        Name: 
        <button>
        {holding.stock.company_name} | {holding.stock.symbol}
        </button> <br />
        Quantity: {holding.quantity} <br />
        Purchase Price: {holding.purchase_price} <br />
        Trade Executed At: {holding.created_at} <br />


        
        <br />
        </div>
        
    ))
    
    : <p>Make trades!</p>}






    </div>
  )
}

export default FetchAllHoldings