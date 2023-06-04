import React from 'react'

const IndustryList = ({industries}) => {
    if (!industries) {
        return <div>Loading...</div>
    }

  return (
    // when the button gets clicked, it needs to have the same
    // functionality as the submit button in the form
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