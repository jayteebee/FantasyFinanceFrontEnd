import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const IndustryList = ({ industries, onIndustrySelect }) => {
  if (!industries) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ButtonGroup vertical>
        {industries.map((industry) => (
          <div key={industry.id}>
            <Button onClick={() => onIndustrySelect(industry)}>
              {industry.name}
            </Button>
          </div>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default IndustryList;
