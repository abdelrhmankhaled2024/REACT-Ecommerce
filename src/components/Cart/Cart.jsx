import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "./../context/cartContext";
import Loading from "./../Loading/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getCart, deleteItem, setCounter, updateQuantity } =
    useContext(cartContext);
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);

  async function deleteProduct(id) {
    let data = await deleteItem(id);

    if (data.status == "success") {
      toast.error("Product deleted Successfully.");
      setCounter(data.numOfCartItems);
      setData(data);
    }
  }

  async function updateProductQuantit(id, count) {
    let data = await updateQuantity(id, count);
    if (data.status == "success") {
      toast.success("Product Updated Successfully.");
      setCounter(data.numOfCartItems);
      setData(data);
    }
  }

  useEffect(() => {
    (async () => {
      let data = await getCart();
      if (data?.response?.data.statusMsg == "fail") {
        setData(null);
      } else {
        setData(data);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loading />;
  if (data == null || data.numOfCartItems == 0)
    return <h2 className="'text-center my-5 text-main">No Items in Cart</h2>;
  return (
    <div className="container my-2 bg-main-light p-3 rounded-3">
      <h2>Show Cart</h2>
      <p className="text-main">
        Total Cart Price : {data?.data.totalCartPrice} EGP
      </p>
      {data?.data.products.map((item) => {
        return (
          <div key={item._id} className="row py-2 border-bottom  ">
            <div className="col-md-1">
              <img
                src={item.product.imageCover}
                className="w-100"
                alt={item.product.title}
              />
            </div>
            <div className="col-md-11 d-flex justify-content-between">
              <div>
                <p className="m-1">{item.product.title}</p>
                <p className="text-main m-0 p-0">Price : {item.price} EGP</p>
                <button
                  onClick={() => deleteProduct(item.product._id)}
                  className="btn m-0 p-0"
                >
                  <i className="fa-solid fa-trash-can text-main"></i>
                  Remove
                </button>
              </div>
              <div>
                <button
                  onClick={() =>
                    updateProductQuantit(item.product._id, item.count + 1)
                  }
                  className="btn brdr"
                >
                  +
                </button>
                <span className="px-2">{item.count}</span>
                <button
                  disabled={item.count <= 1}
                  onClick={() => {
                    updateProductQuantit(item.product._id, item.count - 1);
                  }}
                  className="btn brdr"
                >
                  -
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="w-100 m-auto row">
        <Link
          to={'/address/'+data.data._id}
          className="bg-main text-white w-100 rounded-3 p-2 text-center brdr"
        >
          Place Order
        </Link>
      </div>
    </div>
  );
}
