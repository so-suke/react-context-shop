import React from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Cart } from "./cart";
import CartContext from "../contexts/cart";

export const InYourCart = ({ cart, getTotalInCart }) => {
  return (
    <CartContext.Consumer>
      {({ getTotalInCart }) => {
        return (
          <div className="p-4">
            <Button variant="link" as={Link} to="/">
              &lt; Back to CartList
            </Button>
            <p className="h2">In Your Cart</p>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sub Total</th>
                </tr>
              </thead>
              <tbody>
                <Cart></Cart>
              </tbody>
            </Table>
            <hr />
            <p className="text-center">Total: {getTotalInCart()} yen</p>
          </div>
        );
      }}
    </CartContext.Consumer>
  );
};
