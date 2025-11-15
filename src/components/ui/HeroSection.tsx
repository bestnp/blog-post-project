import React from 'react';
import heroImg from '@/img/chewy-hUvNi1HaZg0-unsplash.jpg';

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row justify-between items-center px-4 py-8 lg:py-16 space-y-6 lg:space-y-0 lg:space-x-12 max-w-[1200px] mx-auto">
      {/* Mobile Layout - Text First */}
      <div className="w-full text-center lg:hidden">
        <h1 className="text-4xl sm:text-5xl text-brown-600 font-bold leading-tight mb-4">
          Stay Informed,<br />Stay Inspired
        </h1>
        <p className="text-brown-400 text-body-sm mb-6">
          Discover a World of Knowledge at Your Fingertips.
          Your Daily Dose of Inspiration and Information.
        </p>
      </div>

      {/* Mobile Layout - Image */}
      <div className="w-full lg:hidden">
        <div className="relative h-[300px] sm:h-[400px] w-full rounded-xl overflow-hidden">
          <img
            src={heroImg}
            alt="Hero"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Mobile Layout - Author */}
      <div className="w-full lg:hidden text-left">
        <p className="text-brown-400 text-body-sm mb-1">- Author</p>
        <h4 className="text-brown-500 text-h3 mb-2">Thompson P.</h4>
        <p className="text-brown-400 text-body-sm mb-2">
          I am a pet enthusiast and freelance writer
          who specializes in animal behavior and
          care. With a deep love for cats, I enjoy
          sharing insights on feline companionship
          and wellness.
        </p>
        <p className="text-brown-400 text-body-sm">
          When I'm not writing, I spend time
          volunteering at my local animal shelter,
          helping cats find loving homes.
        </p>
      </div>

      {/* Desktop Layout */}
      {/* Left */}
      <div className="hidden lg:block lg:w-1/3 text-center lg:text-left">
        <h1 className="text-h1 text-brown-600 font-bold leading-tight mb-4 text-right">
          Stay<br />Informed,<br />Stay Inspired
        </h1>
        <p className="text-brown-400 text-right text-body-sm">
          Discover a World of Knowledge at Your Fingertips.
          Your Daily Dose of Inspiration <br />
          and Information.
        </p>
      </div>

      {/* Center */}
      <div className="hidden lg:block relative h-[529px] w-[386px] rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={heroImg}
          alt="Hero"
          className="w-full h-full object-cover rounded-xl opacity-80"
        />
      </div>

      {/* Right */}
      <div className="hidden lg:block lg:w-1/3">
        <p className="text-brown-400 text-body-sm mb-1 text-left">- Author</p>
        <h4 className="text-brown-500 text-h3 text-left mb-2">Thompson P.</h4>
        <p className="text-brown-400 text-body-sm mb-2 text-left">
          I am a pet enthusiast and freelance writer
          who specializes in animal behavior and<br/>
          care. With a deep love for cats, I enjoy<br/>
          sharing insights on feline companionship<br/>
          and wellness.<br/><br/>
          When I'm not writing, I spend time<br/>
          volunteering at my local animal shelter,<br/>
          helping cats find loving homes.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

