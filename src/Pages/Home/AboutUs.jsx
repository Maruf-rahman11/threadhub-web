import React from 'react';

const AboutUs = () => {
    return (
      <section className="py-20 bg-base-100 text-base-content">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">About Us</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              We are a community-driven platform where people share ideas, raise awareness, and spark discussions on education, health, and politics — the topics that shape our society.
            </p>
          </div>
  
          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Text Content */}
            <div>
              <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
              <p className="mb-6 text-base-content/80 leading-relaxed">
                Our mission is to empower individuals to express their opinions, exchange knowledge, and learn from diverse perspectives.  
                We believe that open discussions can lead to better understanding, awareness, and positive change in our communities.
              </p>
  
              <h3 className="text-2xl font-semibold mb-3">What We Offer</h3>
              <ul className="list-disc list-inside space-y-2 text-base-content/80">
                <li>🧠 Thoughtful discussions on education, health, and politics.</li>
                <li>📢 A platform to share posts, insights, and experiences.</li>
                <li>🤝 A safe and respectful community for everyone’s voice.</li>
                <li>📈 Opportunities to learn from others and grow together.</li>
              </ul>
            </div>
  
            {/* Image / Illustration */}
            <div className="flex justify-center">
              <img
                src="https://img.freepik.com/premium-vector/about-us_773186-1363.jpg?semt=ais_hybrid&w=740&q=80"
                alt="About us illustration"
                className="max-w-sm w-full rounded-2xl shadow-md"
              />
            </div>
          </div>
  
          {/* CTA */}
    
        </div>
      </section>
    );
  };
  
  export default AboutUs;
  