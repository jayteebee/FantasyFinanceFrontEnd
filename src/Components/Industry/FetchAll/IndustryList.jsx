import React from 'react'

const IndustryList = ({industries}) => {
    if (!industries) {
        return <div>Loading...</div>
    }

  return (
  
    <div>
        {industries.map(industry => (
            <div key={industry.id}>
            
              <button>
                {industry.name}
              </button>
            </div>
            
        ))}
    </div>
  )


}

export default IndustryList