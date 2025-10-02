import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const Comments = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data: comments = [], isLoading, isError } = useQuery({
    queryKey: ["postComments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/comments/${id}`);
      return res.data;
    },
  });

  const [feedbackState, setFeedbackState] = useState({}); 
  // { commentIndex: "option1" or "option2" }

  const handleFeedbackChange = (index, value) => {
    setFeedbackState((prev) => ({ ...prev, [index]: value }));
  };

  const handleReport = (index) => {
    Swal.fire({
      icon: "info",
      title: `Reported comment #${index + 1}`,
      text: `Feedback: ${feedbackState[index]}`,
    });
    // Optionally send this to backend here
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading comments...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load comments.
      </p>
    );

  return (
    <div className="w-full mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Comments</h2>

      {comments.length === 0 ? (
        <p className="text-center text-gray-500">No comments yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">#</th>
                <th className="border border-gray-300 p-2">Comment</th>
                <th className="border border-gray-300 p-2">Feedback</th>
                <th className="border border-gray-300 p-2">Report</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 p-2">{comment}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <select
                      value={feedbackState[index] || ""}
                      onChange={(e) =>
                        handleFeedbackChange(index, e.target.value)
                      }
                      className="select select-bordered w-full max-w-xs"
                    >
                      <option value="">Select feedback</option>
                      <option value="Helpful">Helpful</option>
                      <option value="Not helpful">Not helpful</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => handleReport(index)}
                      className={`btn btn-sm btn-error ${
                        !feedbackState[index] ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={!feedbackState[index]}
                    >
                      Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Comments;
