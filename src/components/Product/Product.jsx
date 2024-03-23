import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import { toast } from "react-toastify";

export default function Product({ item }) {
  let { counter, setCounter, addToCart } = useContext(cartContext);
  let [btnLoading, setBtnLoading] = useState(true);
  async function addProductToCart(productId) {
    setBtnLoading(false);
    let data = await addToCart(productId);
    if (data.status == "success") {
      toast.success("Product added successfully");
      setCounter(data.numOfCartItems);
      setBtnLoading(true);
    }
  }

  const navigate = useNavigate();

  const productDetails = () => {
    navigate("/productdetails/" + item._id);
  };

  return (
    <>
      <div className="col-md-2 p-3 product cursor-pointer rounded-3">
        <div onClick={productDetails}>
          <img src={item.imageCover} className="w-100" alt={item.title} />
          <span className="text-main">{item.category.name}</span>
          <h5 className="my-2 fw-bold">
            {item.title.split(" ").slice(0, 2).join(" ")}
          </h5>
          <div className="d-flex justify-content-between my-3">
            <div>{item.price} EGP</div>
            <div>
              {item.ratingsAverage}{" "}
              <i className="fa-solid fa-star rating-color"></i>
            </div>
          </div>
        </div>
        <button
          disabled={!btnLoading}
          onClick={() => addProductToCart(item._id)}
          className="btn bg-main w-100 text-white"
        >
          {btnLoading ? "Add To Cart" : "Loading..."}
        </button>
      </div>
    </>
  );
}
