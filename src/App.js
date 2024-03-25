import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import SignUp from "./components/SignUp/SignUp";
import Signin from "./components/Signin/Signin";
import AuthLayout from "./components/Layouts/AuthLayout";
import NotFound from "./components/NotFound/NotFound";
import { Offline } from "react-detect-offline";
import ProtevtedRoutes from "./components/ProtevtedRoutes/ProtevtedRoutes";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./components/context/cartContext";
import { ToastContainer } from "react-toastify";
import Address from "./components/Address/Address";

export default function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
         <ProtevtedRoutes>
              <Home />
            </ProtevtedRoutes>
          ),
        },
        {
          path: "home",
          element: (
 <ProtevtedRoutes>
              <Home />
            </ProtevtedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtevtedRoutes>
              <Home />
            </ProtevtedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtevtedRoutes>
              <Products />
            </ProtevtedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtevtedRoutes>
              <Categories />
            </ProtevtedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtevtedRoutes>
              <Cart />
            </ProtevtedRoutes>
          ),
        },
        {
          path: "address/:id",
          element: (
            <ProtevtedRoutes>
              <Address />
            </ProtevtedRoutes>
          ),
        },
        { path: "*", element: <NotFound /> },
        {
          path: "productdetails/:id",
          element: (
            <ProtevtedRoutes>
              <ProductDetails />
            </ProtevtedRoutes>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "signup", element: <SignUp /> },
        { path: "signin", element: <Signin /> },
      ],
    },
  ]);
  return (
    <>
      <Offline>
        <div className="offline">You are offline Now!!</div>
      </Offline>
      <ToastContainer />
      <CartContextProvider>
        <RouterProvider router={routes} />
      </CartContextProvider>
    </>
  );
}
