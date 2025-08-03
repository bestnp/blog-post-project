import React from 'react';

const HeroSection = () => {
  return (
    <section className="flex flex-col lg:flex-row justify-between items-center px-8 py-16 space-y-8 lg:space-y-0 lg:space-x-12">
      {/* Left */}
      <div className="lg:w-1/3 text-center lg:text-left">
        <h1 className="text-4xl font-bold leading-tight mb-4 text-right">
          Stay<br />Informed,<br />Stay Inspired
        </h1>
        <p className="text-brown-100 text-right">
          Discover a World of Knowledge at Your Fingertips.
          Your Daily Dose of Inspiration <br />
          and Information.
        </p>
      </div>

      {/* Center */}
      <div className="relative h-[529px] w-[386px] rounded-xl overflow-hidden flex-shrink-0">
        <img
          src="src/img/xgfy0xnvyemkklcqodkg.jpg"
          alt="Hero"
          className="w-full h-full object-cover rounded-xl opacity-80"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div> */}
      </div>


      {/* Right */}
      <div className="lg:w-1/3">
        <p className="text-sm text-gray-500 mb-1 text-left">- Author</p>
        <h4 className="text-lg text-left font-semibold mb-2">Thompson P.</h4>
        <p className="text-gray-700 mb-2 text-left">
          I am a pet enthusiast and freelance writer
          who specializes in animal behavior and<br/>
          care. With a deep love for cats, I enjoy<br/>
          sharing insights on feline companionship<br/>
          and wellness.<br/><br/>
          When I’m not writing, I spend time<br/>
          volunteering at my local animal shelter,<br/>
          helping cats find loving homes.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
