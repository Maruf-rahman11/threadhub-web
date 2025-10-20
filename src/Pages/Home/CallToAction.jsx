import React from "react";
import { FaPenNib, FaUsers, FaLightbulb } from "react-icons/fa";

const CallToAction = () => {
  return (
    <section className="py-20 my-10 bg-gradient-to-r from-primary to-secondary text-primary-content">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Have Something to Say?
        </h2>
        <p className="mb-8 text-lg md:text-xl text-primary-content/90">
          Join thousands of thinkers, learners, and changemakers sharing ideas on 
          <span className="font-semibold"> Education</span>, 
          <span className="font-semibold"> Health</span>, and 
          <span className="font-semibold"> Politics</span>.  
          Make your voice heard and inspire meaningful change.
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center">
            <FaPenNib className="text-4xl mb-2 text-white/90" />
            <h4 className="font-semibold text-lg">Share Your Posts</h4>
            <p className="text-white/70 text-sm">Create posts on topics that matter to you and your community.</p>
          </div>
          <div className="flex flex-col items-center">
            <FaUsers className="text-4xl mb-2 text-white/90" />
            <h4 className="font-semibold text-lg">Engage with Community</h4>
            <p className="text-white/70 text-sm">Connect with like-minded users, comment, and exchange ideas.</p>
          </div>
          <div className="flex flex-col items-center">
            <FaLightbulb className="text-4xl mb-2 text-white/90" />
            <h4 className="font-semibold text-lg">Gain Insights</h4>
            <p className="text-white/70 text-sm">Learn from diverse perspectives and trending discussions.</p>
          </div>
        </div>

        {/* Call-to-action Button */}
        <a
          href="/dashboard/addPost"
          className="btn btn-accent btn-lg px-10 py-4 text-lg hover:scale-105 transition-transform"
        >
          Start Posting Now
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
