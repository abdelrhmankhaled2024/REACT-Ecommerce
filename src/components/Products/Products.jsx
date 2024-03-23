import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import { useQuery } from "react-query";

export default function Products() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading } = useQuery("getProducts", getProducts, {
    // cacheTime:3000,
    // refetchInterval:1000,
    // refetchOnMount:false,
    // refetchOnWindowFocus:false,
    // refetchOnReconnect:true,
    // enabled:false,
  });
  //   let [products, setProducts] = useState([]);
  //   let [loading, setLoading] = useState(true);
  //   async function getProducts() {
  //     let { data } = await axios.get(
  //       "https://ecommerce.routemisr.com/api/v1/products"
  //     );
  //     console.log(data.data);
  //     setProducts(data.data);
  //     setLoading(false);
  //   }
  //   useEffect(() => {
  //     getProducts();
  //   }, []);
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="container my-5">
        <div className="row">
          {data?.data.data.map((item) => {
            return <Product item={item} key={item._id} />;
          })}
        </div>
      </div>
    </>
  );
}
