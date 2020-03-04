import React from "react";

import CartContext from "../contexts/cart";

import { FormControl, Image } from "react-bootstrap";

export const ProductInCart = ({ product, index }) => {
  return (
    <CartContext.Consumer>
      {({ changeQuantity, getProductById }) => {
        return (
          <tr className="productInCart" key={product.id}>
            <td>{index + 1}</td>
            <td>{getProductById(product.id).name}</td>
            <td>
              {
                <Image
                  className="productImageInCart"
                  src={`/images/${getProductById(product.id).name}.jpeg`}
                />
              }
            </td>
            <td>{getProductById(product.id).price}</td>
            <td>
              <FormControl
                value={product.quantity}
                onChange={event => changeQuantity({ event, id: product.id })}
                type="number"
              />
            </td>
            <td>{getProductById(product.id).price * product.quantity}</td>
          </tr>
        );
      }}
    </CartContext.Consumer>
  );
};
