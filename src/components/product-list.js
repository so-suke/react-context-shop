import React from "react";
import Product from "./product";

export const ProductList = ({ products, categoryNow }) => {
  return products[categoryNow].map(product => {
    return <Product key={product.id} product={product}></Product>;
  });
};
