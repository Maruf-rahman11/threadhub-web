import React, { use, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Contexts/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyPosts = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [selectedPost, setSelectedPost] = useState(null); // for modal
  const queryClient = useQueryClient();

  const {
    data: posts = [],
  } = useQuery({
    queryKey: ["post", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/posts/${id}`);
          
          if (res.data) {
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
  
            // ✅ Optimistically update cache
            queryClient.setQueryData(["post", user.email], (oldData) => {
              if (!oldData) return []; // safety check
              return oldData.filter((post) => post._id !== id);
            });
  
            // ✅ Close modal if deleted post is open
            if (selectedPost?._id === id) {
              setSelectedPost(null);
            }
  
            // ✅ As a fallback, also invalidate query to sync with backend
            queryClient.invalidateQueries(["post", user.email]);
          }
        } catch (error) {
          console.error("Error deleting post:", error);
          Swal.fire("Error!", "Failed to delete the post.", "error");
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto mt-10">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Tag</th>
            <th>UpVotes</th>
            <th>DownVotes</th>
            <th>Created At</th>
            <th>Action</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post, index) => (
            <tr key={post._id}>
              <td>{index + 1}</td>
              <td>{post.title}</td>
              <td>
                {post.description.length > 50 ? (
                  <>
                    {post.description.slice(0, 50)}...
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="btn btn-link text-blue-600"
                    >
                      See More
                    </button>
                  </>
                ) : (
                  post.description
                )}
              </td>
              <td>{post.tag}</td>
              <td>{post.upVote}</td>
              <td>{post.downVote}</td>
              <td>{new Date(post.created_at).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </td>
              <td>
                <Link to={`/dashboard/comments/${post._id}`}
                  className="btn btn-primary btn-sm"
                >
                  Comments
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <h2 className="text-xl font-bold mb-4">{selectedPost.title}</h2>
            <p className="text-gray-700 mb-4">{selectedPost.description}</p>
            <button
              onClick={() => setSelectedPost(null)}
              className="btn btn-primary w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
