import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Slider from "react-slick";
import Category from "./../Category/Category";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";

export default function Categories() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data, isLoading } = useQuery("getCategories", getCategories, {
    // cacheTime:3000,
    // refetchInterval:1000,
    // refetchOnMount:false,
    // refetchOnWindowFocus:false,
    // refetchOnReconnect:true,
    // enabled:false,
  });
  // const [categories, setCategories] = useState([]);
  // let [loading, setLoading] = useState(true);
  // async function getCategories() {
  //   let { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/categories"
  //   );
  //   setCategories(data.data);
  //   setLoading(false);
  // }
  // useEffect(() => {
  //   getCategories();
  // }, []);
  if (isLoading) return <Loading />;
  return (
    <div className="container my-5">
      <h3>Shop Popular Categories</h3>
      <Slider {...settings}>
        {data?.data.data.map((item) => (
          <Category item={item} key={item._id} />
        ))}
      </Slider>
    </div>
  );
}
