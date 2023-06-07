import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import FetchWatchlistOnly from "../../Watchlist/FetchWatchlistOnly";
import { Row, Col } from "react-bootstrap";

const IndustryList = ({ industries, onIndustrySelect }) => {
  if (!industries) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Row>
        <div className="half-scrollable-div">
          <ButtonGroup vertical>
            {industries.map((industry) => (
              <div key={industry.id}>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => onIndustrySelect(industry)}
                >
                  {industry.name}
                </Button>
              </div>
            ))}
          </ButtonGroup>
        </div>
      </Row>
      <Row>
      <h3>Watchlists</h3>
        <div className="quarter-scrollable-div">
        
          <FetchWatchlistOnly />
        </div>
      </Row>
    </div>
  );
};

export default IndustryList;
