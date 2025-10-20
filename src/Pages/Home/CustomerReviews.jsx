import React from 'react';

import { FaStar, FaRegStar, FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Ayesha Rahman",
    role: "Teacher",
    feedback:
      "This platform is amazing! I love how easily I can share my thoughts on education and learn from others’ experiences.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rafiq Hossain",
    role: "Health Enthusiast",
    feedback:
      "The discussions around health awareness are really helpful. I’ve discovered so many valuable insights here.",
    rating: 4,
  },
  {
    id: 3,
    name: "Mehedi Hasan",
    role: "University Student",
    feedback:
      "It’s inspiring to see people sharing honest opinions on politics and current affairs respectfully. Great community!",
    rating: 5,
  },
];

const CustomerReviews = () => {
  return (
    <section className="py-20 bg-base-200 text-base-content">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">What Our Users Say</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Real voices from our community — learners, thinkers, and changemakers who make this platform special.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="card-body">
                <FaQuoteLeft className="text-primary text-3xl opacity-70 mb-4" />
                <p className="text-base-content/80 mb-4">“{review.feedback}”</p>

                {/* Star ratings */}
                <div className="flex gap-1 text-yellow-400 mb-3">
                  {Array.from({ length: 5 }, (_, i) =>
                    i < review.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                  )}
                </div>

                {/* User info */}
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-base-content/60">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
