import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Row,
  Badge
} from "react-bootstrap";
import { ProductList } from "./components/product-list";
import { InYourCart } from "./components/in-your-cart";

import { products } from "./masters/products";
import ProductContext from "./contexts/product";
import CartContext from "./contexts/cart";

const createProducts = ({ id, quantity }) => {
  return {
    id,
    quantity
  };
};

const category = {
  fruits: "fruits",
  vegetables: "vegetables"
};

const productMapById = new Map();
Object.keys(products).forEach(category => {
  products[category].forEach(product => {
    productMapById.set(product.id, product);
  });
});
const getProductById = id => {
  return productMapById.get(id);
};

function App() {
  const [cart, setCart] = useState([
    createProducts({ id: 1, quantity: 1 }),
    createProducts({ id: 2, quantity: 2 })
  ]);
  const [categoryNow, setCategoryNow] = useState(category.fruits);

  const addToCart = ({ id }) => {
    const $inputProductSalesNumber = document.getElementById(
      `productNumber_${id}`
    );
    if ($inputProductSalesNumber.value === "") return;
    const salesNumber = parseInt($inputProductSalesNumber.value);
    const isExists = cart.some(product => product.id === id);
    if (isExists) {
      const settedCart = [...cart].map(product => {
        if (product.id === id) {
          product.quantity += salesNumber;
        }
        return product;
      });
      setCart(settedCart);
    } else {
      setCart([
        ...cart,
        createProducts({
          id,
          quantity: salesNumber
        })
      ]);
    }
  };

  const getProductsNumberInCart = () => {
    return cart.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
  };

  const changeCategory = event => {
    setCategoryNow(event);
  };

  const changeQuantity = ({ event, id }) => {
    const updatedCart = cart.map(product => {
      if (product.id === id) {
        product.quantity = parseInt(event.target.value);
      }
      return product;
    });

    setCart(updatedCart);
  };

  const getTotalInCart = () => {
    return cart.reduce((acc, product) => {
      return acc + getProductById(product.id).price * product.quantity;
    }, 0);
  };

  return (
    <Container fluid>
      <Router>
        <Navbar bg="dark">
          <Link to="/">
            <Navbar.Brand className="text-white">Brand text</Navbar.Brand>
          </Link>
          <NavDropdown
            className="text-white"
            title="Categories"
            onSelect={event => changeCategory(event)}
          >
            {Object.keys(category).map(categoryKey => {
              return (
                <NavDropdown.Item key={categoryKey} eventKey={categoryKey}>
                  {categoryKey}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
          <Nav.Link className="btn btn-primary ml-auto" as={Link} to="/cart">
            <Badge variant="light">{getProductsNumberInCart()}</Badge>
            <span className="pl-2">items in Your Cart</span>
          </Nav.Link>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <Row className="pt-2 px-3">
              <ProductContext.Provider value={{ addToCart }}>
                <ProductList
                  products={products}
                  categoryNow={categoryNow}
                ></ProductList>
              </ProductContext.Provider>
            </Row>
          </Route>
          <Route path="/cart">
            <CartContext.Provider
              value={{
                cart,
                getProductById,
                getTotalInCart,
                changeQuantity
              }}
            >
              <InYourCart></InYourCart>
            </CartContext.Provider>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
