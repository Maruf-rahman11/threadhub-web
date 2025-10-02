import React from "react";

const tags = ["technology", "education", "health", "entertainment"];

const TagSection= ({ onTagSelect }) => {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Browse by Tags</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className="px-6 py-2 rounded-full border border-blue-500 bg-white text-blue-500 hover:bg-blue-500 hover:text-white transition font-medium shadow-sm"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagSection;
