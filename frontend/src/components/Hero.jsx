import React from 'react'
import { Link } from 'react-router-dom';
import img from '../assets/img.jpg'

const Hero = () => {
  return (
    <div>

<section >
  <div className="p-8 md:p-12 lg:px-16 lg:py-24">
    <div className="mx-auto max-w-lg text-center">
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
      Stay Updated with Your Favorite YouTube Channels!
      </h2>

      <p className="hidden text-gray-500 sm:mt-4 sm:block text-lg md:text-xl">
      Get the latest videos instantly from any YouTube channel using RSS feeds. No more missing out!
      </p>
    </div>

    <div className="mt-6 flex justify-center">
          <Link
            to="/signup"
            className="rounded-md bg-rose-600 px-6 py-3 text-sm font-medium text-white shadow-sm"
          >
            Get Started
          </Link>
        </div>
  </div>
  <div className="flex justify-center">
          <img 
            src={img} 
            alt="Hero" 
            className="w-full max-w-3xl h-auto rounded-lg shadow-lg"
          />
        </div>
</section>

    </div>
  )
}

export default Hero;
