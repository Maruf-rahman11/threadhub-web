import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import { useNavigate } from "react-router";
import TagSection from "./TagSection";

const HomePosts = () => {
  const navigate = useNavigate();
  const axios = useAxios();

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState(""); // controlled input
  const [searchTag, setSearchTag] = useState(""); // query state
  const [sortByPopularity, setSortByPopularity] = useState(false);

  // Only update query state when user submits
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // reset to first page
    setSearchTag(searchInput);
  };

  const fetchPosts = async () => {
    const res = await axios.get("/posts", {
      params: { page, tag: searchTag, sortByPopularity },
    });
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", page, searchTag, sortByPopularity],
    queryFn: fetchPosts,
    keepPreviousData: true,
  });

  if (isLoading) return <p className="text-center mt-10">Loading posts...</p>;
  if (isError) return <p className="text-center mt-10">Error loading posts</p>;

  const posts = data?.posts || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {/* Hero Banner with Search */}
      <div
        className="hero min-h-96 rounded-xl mb-8"
        style={{
          backgroundImage:
            "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhOUpyS5D6Jrjd_W6RLN2BIAAoZ5ddQcD3kw&s)",
        }}
      >
        <div className="hero-overlay rounded-xl"></div>
        <div className="hero-content text-neutral-content text-center px-4">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold">Discover & Share Posts</h1>
            <p className="mb-5 text-lg">
              Explore posts by category, learn from others, and share your knowledge.
            </p>

            {/* Search & Sort */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col md:flex-row gap-4 justify-center"
            >
              <input
                type="text"
                placeholder="Search by tag..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="input text-black input-bordered w-full md:w-1/3"
              />
              <button type="submit" className="btn btn-primary w-full md:w-1/4">
                Search
              </button>
              <button
                type="button"
                onClick={() => setSortByPopularity((prev) => !prev)}
                className="btn btn-secondary w-full md:w-1/4"
              >
                Sort by Popularity
              </button>
              
            </form>
            <TagSection></TagSection>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => {
          const totalVote = post.upVote - post.downVote;
          return (
            <div
              key={post._id}
              className="p-4 bg-white rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/postDetails/${post._id}`)}
            >
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={post.authorImage}
                  alt={post.authorName}
                  className="w-12 h-12 rounded-full border-2 border-blue-500"
                />
                <div>
                  <h3 className="font-semibold">{post.authorName}</h3>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <h4 className="text-lg font-bold mb-2">{post.title}</h4>
              <p className="text-gray-700 mb-2">{post.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="badge badge-info">{post.tag}</span>
                <span>Votes: {totalVote}</span>
                <span>Comments: {post.upVote}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`btn btn-sm ${page === idx + 1 ? "btn-primary" : ""}`}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePosts;
