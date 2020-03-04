import React from "react";
import { Col, Card, Button, InputGroup, FormControl } from "react-bootstrap";

import ProductContext from "../contexts/product";

export default function product({ product }) {
  return (
    <ProductContext.Consumer>
      {({ addToCart }) => {
        return (
          <Col key={product.id} className="col-2 pt-4">
            <Card className="card">
              <Card.Img
                className="w-100 h-50"
                variant="top"
                src={`/images/${product.name}.jpeg`}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>Qty</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id={`productNumber_${product.id}`}
                    type="number"
                  />
                </InputGroup>
                <Button
                  variant="outline-secondary"
                  onClick={() => addToCart({ id: product.id })}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      }}
    </ProductContext.Consumer>
  );
}
