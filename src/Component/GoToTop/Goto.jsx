import React from 'react'
import './GoToStyle.css'
import './GoToScript'
import { useState, useEffect } from 'react';
import { FaChevronCircleUp} from 'react-icons/fa';

const Goto = () => {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
      window.addEventListener('scroll', () => {
          if (window.scrollY > 100) {
              setIsVisible(true);
          } else {
              setIsVisible(false);
          }
      });
  }, []);

  const goTop = () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth',
      });
  };
  



  return (
   <>
  <button className="btn-scrollTop" style={{display: isVisible ? 'block':'none'}} onClick={goTop}>
            <FaChevronCircleUp/>
        </button>
   </>
  )
}

export default Goto
