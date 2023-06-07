import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";



const FetchSpecificIndustries = ({ industries, onIndustrySelect }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!industries) {
      return;
    }

    const industry = industries.find((industry) => industry.name === input);
    if (industry) {
      onIndustrySelect(industry);
      setInput("");
    } else {
      console.log(`No industry found with the name "${input}"`);
    }
  };

  return (
    <div>
    <Row className="align-items-center">
   
      <Form onSubmit={handleSubmit} className="d-flex">

       <Col xs="auto">
        <Form.Control
          type="text"
          value={input}
          placeholder="Search Industry"
          onChange={handleChange}
          size="sm"
        />
        </Col>

<Col xs="auto">
        <Button type="submit" variant="outline-light" size="sm" value="Submit">Search</Button>
        </Col>

        </Form>

      </Row>
    </div>
  );
};

export default FetchSpecificIndustries;
