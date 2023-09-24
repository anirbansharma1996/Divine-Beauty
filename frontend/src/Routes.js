import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home";
import { Cart } from "./components/Cart/cart";
import { Products } from "./components/Product/products";
import { Membership } from "./components/membership";
import { SingleProduct } from "./components/Product/singleProduct";
import { Signup } from "./components/Auth/signup";
import { Login } from "./components/Auth/login";
import { UserData } from "./components/Auth/user";
import { Order } from "./components/Orders/order";
import { Success } from "./components/sucess";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />}></Route>
      <Route path={"/products"} element={<Products />}></Route>
      <Route path={"/product/:id"} element={<SingleProduct />}></Route>
      <Route path={"/membership"} element={<Membership />}></Route>
      <Route path={"/cart"} element={<Cart />}></Route>
      <Route path={"/sign-up"} element={<Signup />}></Route>
      <Route path={"/log-in"} element={<Login />}></Route>
      <Route path={"/user"} element={<UserData />}></Route>
      <Route path={"/orders"} element={<Order />}></Route>
      <Route path={"/payment-success"} element={<Success />}></Route>
      <Route path={"*"} element={<Home />}></Route>
    </Routes>
  );
};
