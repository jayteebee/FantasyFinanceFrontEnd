import React from 'react'
import FetchAllHoldings from "../Components/Holdings/FetchAllHoldings"

const Holding = ({stockPurchased}) => {
  return (
    <div>
    <FetchAllHoldings
    stockPurchased={stockPurchased}
    />
    </div>
  )
}

export default Holding