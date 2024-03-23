import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  let navigate = useNavigate();
  const [errMsg, setErrMsg] = useState();
  const [loading, setLoading] = useState(true);

  async function sendDataToApi(values) {
    try {
      setLoading(false);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      console.log(data);
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle 409 error specifically
        setErrMsg(error.response.data.message);
        setLoading(true);
      } else {
        // Handle other errors
        setErrMsg("Error:", error.message);
        setLoading(true);
      }
    }
  }

  function validationSchema() {
    let schema = new yup.object({
      email: yup.string().email().required(),
      password: yup
        .string()
        .matches(/^[A-Z][a-zA-Z0-9@]{6,}$/)
        .required(),
    });
    return schema;
  }

  let login = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });
  return (
    <>
      <div className="container m-auto">
        <h2>login Now:</h2>
        <form onSubmit={login.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            value={login.values.email}
            type="email"
            placeholder="Type your email..."
            onBlur={login.handleBlur}
            onChange={login.handleChange}
            name="email"
            className="form-control mb-3"
            id="email"
          />
          {login.errors.email && login.touched.email ? (
            <div className="alert alert-danger">{login.errors.email}</div>
          ) : null}
          <label htmlFor="password">Password</label>
          <input
            value={login.values.password}
            type="password"
            autoComplete="off"
            placeholder="Type your password..."
            onBlur={login.handleBlur}
            onChange={login.handleChange}
            name="password"
            className="form-control mb-3"
            id="password"
          />
          {login.errors.password && login.touched.password ? (
            <div className="alert alert-danger">{login.errors.password}</div>
          ) : null}
          {errMsg ? <div className="alert alert-danger">{errMsg}</div> : null}
          <button
            disabled={!(login.dirty && login.isValid)}
            type="submit"
            className="btn bg-main text-white"
          >
            {loading ? (
              "Sign in"
            ) : (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
