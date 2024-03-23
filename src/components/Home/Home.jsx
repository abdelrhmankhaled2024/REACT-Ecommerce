import React from "react";
import MainSlider from "./../MainSlider/MainSlider";
import Categories from "../Categories/Categories";
import Product from "../Product/Product";
import Products from "../Products/Products";

export default function Home() {
  return (
    <>
      <MainSlider />
      <Categories />
      <Products />
    </>
  );
}
