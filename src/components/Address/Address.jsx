import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cartContext } from "../context/cartContext";

export default function Address() {
  let navigate = useNavigate();
  const [errMsg, setErrMsg] = useState();
  const [loading, setLoading] = useState(true);
  let { pay } = useContext(cartContext);
  let { id } = useParams();
  async function sendDataToApi(values) {
    setLoading(false);
    let data = await pay(id,values);
    if (data.status == "success") {
      window.location.href = data.session.url;
    }
  }

  let address = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  return (
    <>
      <div className="container m-auto">
        <h2>Address Details:</h2>
        <form onSubmit={address.handleSubmit}>
          <label htmlFor="details">Details</label>
          <textarea
            type="details"
            placeholder="Type your details..."
            onBlur={address.handleBlur}
            onChange={address.handleChange}
            name="details"
            className="form-control mb-3"
            id="details"
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="phone"
            autoComplete="off"
            placeholder="Type your phone..."
            onBlur={address.handleBlur}
            onChange={address.handleChange}
            name="phone"
            className="form-control mb-3"
            id="phone"
          />

          <label htmlFor="city">City</label>
          <input
            type="city"
            autoComplete="off"
            placeholder="Type your city..."
            onBlur={address.handleBlur}
            onChange={address.handleChange}
            name="city"
            className="form-control mb-3"
            id="city"
          />

          <button
            disabled={!(address.dirty && address.isValid)}
            type="submit"
            className="btn bg-main text-white"
          >
            {loading ? (
              "Pay"
            ) : (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
