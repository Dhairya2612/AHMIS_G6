import React, { useState, useEffect } from 'react';
import './footer.css'

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: '#35374f',
  padding: '10px',
  color: 'white',
  height: '9%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const FooterLv = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div style={footerStyle} className='footercls'>
      <div id='creditdiv'>
        <img className='imgcdac'  src={require('./cdac_logo1.png')} alt="" />
      </div>
      <div className="div3" style={{ textAlign: 'center',fontSize:'1.3rem' }}>
        <b>© {currentYear} Hospital Management Information System.</b>
        <h6 style={{fontSize:'1.3rem'}}>Designed and Developed by C-DAC Noida.</h6>
      </div>
    </div>
  );
};

export default FooterLv;
