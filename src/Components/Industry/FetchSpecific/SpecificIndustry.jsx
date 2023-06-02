import React from 'react'
import FetchAllStocksFromIndustry from '../FetchStocks/FetchStocks'
const SpecificIndustry = ({specificIndustry}) => {
  if (!specificIndustry) {
    return <div>Loading...</div>
}
  return (
   <div>
          <div key={specificIndustry.id}>{specificIndustry.name} </div>
          <FetchAllStocksFromIndustry 

          industry={specificIndustry}
          />
    </div>
  )
}

export default SpecificIndustry

