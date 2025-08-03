import React from 'react';

const HeroSection = () => {
  return (
    <section style={{ display: 'flex', padding: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ maxWidth: '40%' }}>
        <h1 style={{ fontSize: '2rem' }}>Stay Informed,<br />Stay Inspired</h1>
        <p>Discover a World of Knowledge at Your Fingertips. Your Daily dose of inspiration and information.</p>
      </div>
      <div>
        <img src="https://via.placeholder.com/300x300" alt="hero" style={{ borderRadius: '8px' }} />
        <div>
          <h4>Thompson P.</h4>
          <p>I am a part enthusiast and freelance writer. I love to explore random facts and share ideas...</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
