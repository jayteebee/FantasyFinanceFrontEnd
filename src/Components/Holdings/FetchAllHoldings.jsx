import React, {useState, useEffect} from 'react'
import { getAllUserHoldings } from '../../API/holdingAPI'

const FetchAllHoldings = () => {
    const [holdings, setHoldings] = useState(null)
    const userId = 1

useEffect(() => {
    getAllUserHoldings(userId)
    .then(data => setHoldings(data))
    .catch(err => console.log("API Call Failed", err));
}, [])

  return (
    <div>
    <div>FetchAllHoldings</div> <br />
    
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