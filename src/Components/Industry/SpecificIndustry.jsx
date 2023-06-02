import React from 'react'

const SpecificIndustry = ({specificIndustry}) => {
  if (!specificIndustry) {
    return <div>Loading...</div>
}
  return (
   <div>
          <div key={specificIndustry.id}>{specificIndustry.name}</div> 
    </div>
  )
}

export default SpecificIndustry

