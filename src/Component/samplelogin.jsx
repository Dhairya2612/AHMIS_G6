import React from 'react';
import "./logincss.css"


const samplelogin = () => {
  return (
    <div className="custom-landing-page">
      <header className="custom-header">
        <h1 className="custom-header-title">Welcome to our Hospital</h1>
      </header>
      <main className="custom-main">
        <section className="custom-slider">
          {/* Add your slider content here */}
          <img src="slider-image-1.jpg" alt="Slider Image 1" />
          <img src="slider-image-2.jpg" alt="Slider Image 2" />
          {/* Add more slides as needed */}
        </section>
        <section className="custom-login">
          <h2 className="custom-login-title">Login</h2>
          <form className="custom-login-form">
            <input className="custom-login-input" type="text" placeholder="Username" />
            <input className="custom-login-input" type="password" placeholder="Password" />
            <button className="custom-login-button" type="submit">Log In</button>
          </form>
        </section>
      </main>
      <footer className="custom-footer">
        <p className="custom-footer-text">© 2023 Our Hospital. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default samplelogin;
