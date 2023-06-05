import React from 'react'
import FetchAllHoldings from "../Components/Holdings/FetchAllHoldings"

const Holding = ({stockPurchased}) => {
  return (
    <div>
    <div>Holding</div>
    <FetchAllHoldings
    stockPurchased={stockPurchased}
    />
    </div>
  )
}

export default Holding