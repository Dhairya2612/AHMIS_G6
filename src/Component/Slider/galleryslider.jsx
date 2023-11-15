import React, { useEffect, useState } from 'react';
import './gallscript';
import './gallslider.css';

const Galleryslider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Change to the next slide
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 5); // Assuming there are 5 slides
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that the effect runs once on mount

  return (
    <div className="galleryslider" style={{ width: '100%', height: '40rem', backgroundColor: 'white' }}>
      <div id="slider-container" className="slider">
        <div className={`slide ${currentSlide === 0 ? 'active' : ''}`}>
          <img src={require('./pic1.png')} alt="" />
        </div>
        <div className={`slide ${currentSlide === 1 ? 'active' : ''}`}>
          <img src={require('./pic10.png')} alt="" />
        </div>
        <div className={`slide ${currentSlide === 2 ? 'active' : ''}`}>
          <img src={require('./pic5.png')} alt="" />
        </div>
        <div className={`slide ${currentSlide === 3 ? 'active' : ''}`}>
          <img src={require('./pic3.png')} alt="" />
        </div>
        <div className={`slide ${currentSlide === 4 ? 'active' : ''}`}>
          <img src={require('./pic1.png')} alt="" />
        </div>
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default Galleryslider;
