import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/home/HomePage";
import SellPage from "../pages/SellPage";
import AboutPage from "../pages/about/AboutPage";
import FAQsPage from "../pages/FAQsPage";
import ErroPage from "../pages/ErroPage";
import Product from "../pages/product/Product";
import Receiptment from "../pages/admin/Receiptment";
import NavBarAdmin from "../components/layout/NavBarAdmin";
import Assessment from "../pages/admin/Assessment";
import Accounting from "../pages/admin/Accounting";
import Dashboard from "../pages/admin/Dashboard";
import Checkout from "../pages/product/Checkout";
import Shipment from "./../pages/product/Shipment";
import Reception from "../pages/admin/Reception";
import { useSelector } from "react-redux";
import ProductAdmin from "../pages/admin/ProductAdmin";
import Condition from "../pages/admin/Condition";

const RouteNavigate = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <NavBarAdmin /> : <NavBar />}>
        <Route index element={isLoggedIn ? <Reception /> : <HomePage />} />
        <Route path="sell" element={<SellPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="faqs" element={<FAQsPage />} />
        <Route path="sell/product/:productId" element={<Product />} />
        <Route path="sell/product/:productId/checkout" element={<Checkout />} />
        <Route
          path="sell/product/:productId/checkout/shipment"
          element={<Shipment />}
        />
        <Route path="reception" element={<Reception />} />
        <Route path="receiptment" element={<Receiptment />} />
        <Route path="assessment" element={<Assessment />} />
        <Route path="accounting" element={<Accounting />} />
        <Route path="report" element={<Dashboard />} />
        <Route path="product" element={<ProductAdmin />} />
        <Route path="condition" element={<Condition />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<ErroPage />} />
    </Routes>
  );
};

export default RouteNavigate;