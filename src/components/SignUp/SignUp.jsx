import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  let navigate = useNavigate();
  const [errMsg, setErrMsg] = useState();
  const [loading, setLoading] = useState(true);

  async function sendDataToApi(values) {
    try {
      setLoading(false);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log(data);
      if (data.message == "success") {
        navigate("/signin");
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
      name: yup.string().min(2).max(20).required(),
      email: yup.string().email().required(),
      password: yup
        .string()
        .matches(/^[A-Z][a-zA-Z0-9@]{6,}$/)
        .required(),
      rePassword: yup
        .string()
        .oneOf([yup.ref("password")])
        .required(),
    });
    return schema;
  }

  let register = useFormik({
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
        <h2>Register Now:</h2>
        <form onSubmit={register.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            value={register.values.name}
            type="text"
            placeholder="Type your name..."
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            name="name"
            className="form-control mb-3"
            id="name"
          />
          {register.errors.name && register.touched.name ? (
            <div className="alert alert-danger">{register.errors.name}</div>
          ) : null}
          <label htmlFor="email">Email</label>
          <input
            value={register.values.email}
            type="email"
            placeholder="Type your email..."
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            name="email"
            className="form-control mb-3"
            id="email"
          />
          {register.errors.email && register.touched.email ? (
            <div className="alert alert-danger">{register.errors.email}</div>
          ) : null}
          <label htmlFor="password">Password</label>
          <input
            value={register.values.password}
            type="password"
            autoComplete="off"
            placeholder="Type your password..."
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            name="password"
            className="form-control mb-3"
            id="password"
          />
          {register.errors.password && register.touched.password ? (
            <div className="alert alert-danger">{register.errors.password}</div>
          ) : null}
          <label htmlFor="rePassword">Repassword</label>
          <input
            value={register.values.rePassword}
            type="password"
            autoComplete="off"
            placeholder="Re-Enter your password"
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            name="rePassword"
            className="form-control mb-3"
            id="rePassword"
          />
          {register.errors.rePassword && register.touched.rePassword ? (
            <div className="alert alert-danger">
              {register.errors.rePassword}
            </div>
          ) : null}
          {errMsg ? <div className="alert alert-danger">{errMsg}</div> : null}
          <button
            disabled={!(register.dirty && register.isValid)}
            type="submit"
            className="btn bg-main text-white"
          >
            {loading ? (
              "Sign Up"
            ) : (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
