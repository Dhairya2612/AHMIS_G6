import React from "react";
import { useEffect, useState } from "react";
import "./Sliderstyle.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Slider = () => {


  return (
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
        <SwiperSlide>  <img src="https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?w=1060&t=st=1699813326~exp=1699813926~hmac=acc57ccceb5ec73790af0f119f90a950b1eb28ee4a20fff305e64f80d87882b2" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?w=1060&t=st=1699813326~exp=1699813926~hmac=acc57ccceb5ec73790af0f119f90a950b1eb28ee4a20fff305e64f80d87882b2" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?w=1060&t=st=1699813326~exp=1699813926~hmac=acc57ccceb5ec73790af0f119f90a950b1eb28ee4a20fff305e64f80d87882b2" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?w=1060&t=st=1699813326~exp=1699813926~hmac=acc57ccceb5ec73790af0f119f90a950b1eb28ee4a20fff305e64f80d87882b2" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?w=1060&t=st=1699813326~exp=1699813926~hmac=acc57ccceb5ec73790af0f119f90a950b1eb28ee4a20fff305e64f80d87882b2" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?w=1060&t=st=1699813326~exp=1699813926~hmac=acc57ccceb5ec73790af0f119f90a950b1eb28ee4a20fff305e64f80d87882b2" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?w=1060&t=st=1699813326~exp=1699813926~hmac=acc57ccceb5ec73790af0f119f90a950b1eb28ee4a20fff305e64f80d87882b2" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?w=1060&t=st=1699813326~exp=1699813926~hmac=acc57ccceb5ec73790af0f119f90a950b1eb28ee4a20fff305e64f80d87882b2" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?w=1060&t=st=1699813326~exp=1699813926~hmac=acc57ccceb5ec73790af0f119f90a950b1eb28ee4a20fff305e64f80d87882b2" alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
