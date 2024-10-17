import React from 'react';

// Hero component displays a welcome message with some subtext
const hero = () => {
  return (
    <section className="py-20 mb-4">  {/* A section with a black background and vertical padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">  {/* Centers the text within the section */}
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Welcome to InnVoice  {/* Main title in large font */}
          </h1>
          <p className="my-4 text-xl">Manage your bookings, guests, and schedules.</p>
          {/* Subtext below the title */}
          <p className="my-4 text-xl">Get started today!</p>  {/* Call to action with red text */}
        </div>
      </div>
    </section>
  );
}

export default hero;