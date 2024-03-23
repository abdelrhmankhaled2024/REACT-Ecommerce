import React from "react";
import Slider from "react-slick";
import slide1 from "../../assests/images/slider-image-1.jpeg";
import slide2 from "../../assests/images/slider-image-2.jpeg";
import slide3 from "../../assests/images/slider-image-3.jpeg";
import style from "./MainSlider.module.css";
// import slider4 from '../../assests/images/blog-img-2.jpeg';
// import slider5 from '../../assests/images/grocery-banner-2.jpeg';

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  return (
    <>
      <div className="container">
        <Slider {...settings}>
          <img className={style.slider} src={slide1} alt="slide1" />
          <img className={style.slider} src={slide2} alt="slide2" />
          <img className={style.slider} src={slide3} alt="slide3" />
        </Slider>
      </div>
    </>
  );
}

{
  /* <div className='container'>
<div className='row'>
<Slider className='col-md-9 g-0 m-0 p-0' {...settings}>
 <img className={style.slider}src={slide1} alt="slide1" />
 <img className={style.slider}src={slide2} alt="slide2" />
 <img className={style.slider} src={slide3} alt="slide3" />
</Slider>
<div className='col-md-3 g-0 m-0 p-0'>
 <img className={style.slider2}src={slider4} alt="slider4" />
 <img className={style.slider2}src={slider5} alt="slider5" />
</div>
</div>
</div> */
}
