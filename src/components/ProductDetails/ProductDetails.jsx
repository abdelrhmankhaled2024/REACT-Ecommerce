import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import { toast } from "react-toastify";

export default function ProductDetails() {
  let { counter, setCounter, addToCart } = useContext(cartContext);
  async function addProductToCart(productId) {
    let data = await addToCart(productId);
    console.log(data);
    if (data.status == "success") {
      toast.success("Product added successfully");
      setCounter(data.numOfCartItems);
    }
  }
  let x = useParams();
  let [product, setProduct] = useState([]);
  async function getProduct() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + x.id
    );

    setProduct(data.data);
  }
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <div className="container my-5">
        <div className="row mt-5">
          <div className="col-md-4 cursor-pointer ">
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-100"
            />
          </div>
          <div className="col-md-8 my-3 text-center text-md-start">
            <h4>{product.title}</h4>
            <p>{product.description}</p>

            <div className="d-flex justify-content-between my-3">
              <div>{product.price} EGP</div>
              <div>
                {product.ratingsAverage}{" "}
                <i className="fa-solid fa-star rating-color"></i>
              </div>
            </div>
            <button
              onClick={() => addProductToCart(product._id)}
              className="btn bg-main w-100 text-white"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
