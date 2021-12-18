import * as React from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import Home from '../pages/Home'
import ProductList from '../pages/ProductList'
import Product from "../pages/Product";
import Cart from "../pages/Cart"
import Login from "../pages/Login"
import Register from "../pages/Register"
import {useSelector} from "react-redux";
const RouterNav = () => {
    const user = useSelector(state =>state.user.currentUser )
    console.log('User Info: ', user)
    const navigate = useNavigate()
    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/shop" element={<ProductList/>}></Route>
            <Route path="/products/:category" element={<ProductList/>}></Route>
            <Route path="/product/:id" element={<Product/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/registration" element={<Register/>}></Route>

            {/* <Route path="about" element={} /> */}
      </Routes>
    );
};

export default RouterNav;