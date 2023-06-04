import React from 'react'
import FetchAllStocksFromIndustry from '../FetchStocks/FetchStocks'
const SpecificIndustry = ({searchSpecificIndustry}) => {
  if (!searchSpecificIndustry) {
    return <div>Loading...</div>
}
  return (
   <div>
          <div key={searchSpecificIndustry.id}>{searchSpecificIndustry.name}</div>
          <FetchAllStocksFromIndustry searchSpecificIndustry={searchSpecificIndustry}
          />
    </div>
  )
}

export default SpecificIndustry

