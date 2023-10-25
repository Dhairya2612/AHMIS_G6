import React from "react";
import { useEffect, useState } from "react";
import "./Sliderstyle.css";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide % 5) + 1); // Change 5 to the number of slides
    }, 2000); // Change 2000 to set the interval duration in milliseconds

    return () => {
      clearInterval(interval); // Clear the interval on unmount
    };
  }, []);

  return (
    <div
      className="sliderman"
      style={{
        height: "50rem",
        width: "140rem",
        position: "absolute",
        marginInline: "-17rem",
        marginTop: "-5rem",
        borderRadius: "4rem",
      }}
    >
      <section id="slider">
        <input type="radio" name="slider" id="s1" checked={currentSlide === 1} />
        <input type="radio" name="slider" id="s2" checked={currentSlide === 2} />
        <input type="radio" name="slider" id="s3" checked={currentSlide === 3} />
        <input type="radio" name="slider" id="s4" checked={currentSlide === 4} />
        <input type="radio" name="slider" id="s5" checked={currentSlide === 5} />

        <label for="s1" id="slide1">
          <img id="img1" src={require("./1600x960_378841-himachal-pradesh-high-court (1).jpg")} alt="" />
        </label>
        <label for="s2" id="slide2">
          <img id="img2" src={require("./1098234-aims-bilaspur-campus.avif")} alt="" />
        </label>
        <label for="s3" id="slide3">
          <img id="img3" src={require("./Himachal-2.avif")} alt="" />
        </label>
        <label for="s4" id="slide4">
          <img id="img4" src={require("./NPIC-202210675757.jpg")} alt="" />
        </label>
        <label for="s5" id="slide5">
          <img id="img5" src={require("./165559-aiims-bilaspur.webp")} alt="" />
        </label>
      </section>
    </div>
  );
};

export default Slider;
