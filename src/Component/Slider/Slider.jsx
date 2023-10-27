import React from "react";
import { useEffect, useState } from "react";
import "./Sliderstyle.css";

import   {useRef} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';





const Slider = () => {
  

  return (
    <div
      className="sliderman"
      style={{
        height: "30rem",
        width: "60rem",
        position: "absolute",
       marginInline:'18rem',
        marginTop: "10rem",
       
      }}
    >
       <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide> <img id="img1" src={require("./1600x960_378841-himachal-pradesh-high-court (1).jpg")} alt="" /></SwiperSlide>
        <SwiperSlide><img id="img1" src={require("./1600x960_378841-himachal-pradesh-high-court (1).jpg")} alt="" /></SwiperSlide>
        <SwiperSlide><img id="img1" src={require("./1600x960_378841-himachal-pradesh-high-court (1).jpg")} alt="" /></SwiperSlide>
        <SwiperSlide><img id="img1" src={require("./1600x960_378841-himachal-pradesh-high-court (1).jpg")} alt="" /></SwiperSlide>
        <SwiperSlide><img id="img1" src={require("./1600x960_378841-himachal-pradesh-high-court (1).jpg")} alt="" /></SwiperSlide>
        <SwiperSlide><img id="img1" src={require("./1600x960_378841-himachal-pradesh-high-court (1).jpg")} alt="" /></SwiperSlide>
        <SwiperSlide><img id="img1" src={require("./1600x960_378841-himachal-pradesh-high-court (1).jpg")} alt="" /></SwiperSlide>
        <SwiperSlide><img id="img1" src={require("./1600x960_378841-himachal-pradesh-high-court (1).jpg")} alt="" /></SwiperSlide>
        <SwiperSlide><img id="img1" src={require("./1600x960_378841-himachal-pradesh-high-court (1).jpg")} alt="" /></SwiperSlide>
      </Swiper>
    </>
      
    </div>
  );
};

export default Slider;
