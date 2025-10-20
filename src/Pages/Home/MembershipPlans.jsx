import React from 'react';

import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from 'react-router';

const plans = [
  {
    name: "Bronze",
    price: "Free",
    description: "Default membership with basic features",
    features: [
      { text: "Post up to 5 posts", available: true },
      { text: "Standard post visibility", available: true },
      { text: "Access to general categories", available: true },
      { text: "Special tags", available: false },
      { text: "Priority support", available: false },
    ],
    highlighted: false,
  },
  {
    name: "Gold",
    price: "$9.99/month",
    description: "Premium membership with extra privileges",
    features: [
      { text: "Post unlimited posts", available: true },
      { text: "Special tag for your posts", available: true },
      { text: "Enhanced post visibility", available: true },
      { text: "Access to all categories", available: true },
      { text: "Priority support", available: true },
    ],
    highlighted: true,
  },
];

const MembershipPlans = () => {
  return (
    <section className="py-20 bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Membership Plans</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Choose a membership that suits your needs. Upgrade to Gold for more privileges and better visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card shadow-lg border ${
                plan.highlighted ? "border-primary bg-primary text-primary-content" : "bg-base-100"
              } hover:scale-105 transition-transform duration-300`}
            >
              <div className="card-body">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-base-content/70 mb-4">{plan.description}</p>
                <p className="text-3xl font-extrabold mb-6">{plan.price}</p>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      {feature.available ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                {plan.highlighted &&
                <Link to={'/payment'}> <button
                  className="btn btn-secondary w-full"> 
                 Upgrade Now
                </button>
                </Link>
               }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;
