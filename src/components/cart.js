import React from "react";
import CartContext from "../contexts/cart";

import { ProductInCart } from "./product-in-cart";

export const Cart = () => {
  return (
    <CartContext.Consumer>
      {({ cart }) => {
        return (
          <>
            {cart.map((product, index) => {
              return (
                <ProductInCart
                  key={product.id}
                  product={product}
                  index={index}
                ></ProductInCart>
              );
            })}
          </>
        );
      }}
    </CartContext.Consumer>
  );
};
