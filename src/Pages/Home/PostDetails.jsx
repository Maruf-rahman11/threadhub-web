import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { FacebookShareButton, FacebookIcon } from "react-share";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const PostDetails = () => {
    const { id } = useParams(); // post _id from route
    console.log(typeof (id))
    const axios = useAxiosSecure();
    const queryClient = useQueryClient();
    const [commentText, setCommentText] = useState("");

    // Fetch Post Details
    const { data: post, isLoading, isError } = useQuery({
        queryKey: ["post", id],
        queryFn: async () => {
            const res = await axios.get(`/posts/id/${id}`); // 👈 fixed
            return res.data;
        },
    });

    // Upvote Mutation
    const upvoteMutation = useMutation({
        mutationFn: async () => {
            if (!id) throw new Error("Post ID is not available");
            const res = await axios.patch(`/posts/upvote/${id}`);
            Swal.fire("upvoted!", "", "success");
            return res.data;
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["post", id] });
            const previousPost = queryClient.getQueryData(["post", id]);
            if (!previousPost) return;

            queryClient.setQueryData(["post", id], old => ({
                ...old,
                upVote: old.upVote + 1,
            }));


            return { previousPost };
        },
        onError: (err, variables, context) => {
            if (context?.previousPost) {
                queryClient.setQueryData(["post", id], context.previousPost);
            }
            console.error("Upvote failed:", err);
            Swal.fire("Error!", "Failed to upvote. Please try again.", "error");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["post", id] });
        },
    });

    // Downvote Mutation
    const downvoteMutation = useMutation({
        mutationFn: async () => {
            if (!id) throw new Error("Post ID is not available");
            const res = await axios.patch(`/posts/downvote/${id}`);
            Swal.fire("upvoted!", "", "success");
            return res.data;
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["post", id] });
            const previousPost = queryClient.getQueryData(["post", id]);
            if (!previousPost) return;

            queryClient.setQueryData(["post", id], old => ({
                ...old,
                downVote: old.downVote + 1,
            }));

            return { previousPost };
        },
        onError: (err, variables, context) => {
            if (context?.previousPost) {
                queryClient.setQueryData(["post", id], context.previousPost);
            }
            console.error("Downvote failed:", err);
            Swal.fire("Error!", "Failed to downvote. Please try again.", "error");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["post", id] });
        },
    });



    // Add Comment Mutation
    const commentMutation = useMutation({
        mutationFn: async (comment) => {
            const res = await axios.post(`/posts/comment/${id}`, { comment });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["post", id] });
            setCommentText("");
            Swal.fire("Comment added!", "", "success");
        },
    });

    if (isLoading) return <p className="text-center mt-10">Loading post...</p>;
    if (isError) return <p className="text-center mt-10">Error loading post</p>;

    const shareUrl = window.location.href; // dynamic URL for sharing
    const totalVotes = post.upVote - post.downVote;

    return (
     <div>
        {
            post.length === 5?
            <div className="mx-auto text-c">
                <p>cant post mre than 5</p>

            </div>
            :
            <div className="max-w-3xl mx-auto mt-10 p-4">
            {/* Post Details */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-4 mb-4">
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

                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.description}</p>
                <div className="flex items-center gap-4 text-gray-500 mb-4">
                    <span className="badge badge-info">{post.tag}</span>
                    <span>Votes: {totalVotes}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mb-4">
                    <button
                        onClick={() => id && upvoteMutation.mutate()}
                        className="btn btn-sm btn-success"
                    >
                        Upvote ({post.upVote})
                    </button>

                    <button
                        onClick={() => id && downvoteMutation.mutate()}
                        className="btn btn-sm btn-error"
                    >
                        Downvote ({post.downVote})
                    </button>
                    <FacebookShareButton url={shareUrl}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                </div>

                {/* Comment Section */}
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Add a Comment</h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            className="input input-bordered flex-1"
                        />
                        <button
                            onClick={() => commentMutation.mutate(commentText)}
                            className="btn btn-primary"
                        >
                            Comment
                        </button>
                    </div>
                </div>

                {/* Comments List */}
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Comments</h3>
                    {post.comments?.length ? (
                        post.comments.map((c, idx) => (
                            <div key={idx} className="p-2 border-b">
                                <p>{c}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
        }
     </div>
    );
};

export default PostDetails;
