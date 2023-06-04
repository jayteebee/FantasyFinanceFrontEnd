import React from 'react'

const IndustryList = ({industries, onIndustrySelect}) => {
    if (!industries) {
        return <div>Loading...</div>
    }

  return (
  
    <div>
        {industries.map(industry => (
            <div key={industry.id}>
            
              <button onClick={() => onIndustrySelect(industry)}>
                {industry.name}
              </button>
              
            </div>
            
        ))}
    </div>
  )


}

export default IndustryList
