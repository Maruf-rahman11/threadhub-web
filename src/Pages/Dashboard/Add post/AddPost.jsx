import React, { use } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Contexts/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";


const AddPost = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: post = [], } = useQuery({
    queryKey: ["post", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${user.email}`);
      return res.data;
    },
  });
  const { data: userDb = [],  } = useQuery({
    queryKey: ["user", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const newPost = {
      ...data,
      upVote: 0,
      downVote: 0,
      created_at: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/posts", newPost);
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Post added Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      reset();
    } catch (error) {
      console.error("Error adding post:", error.response?.data || error.message);
    }
  };

  // 🔹 Restriction logic
  const isBronze = userDb?.status === "bronze";
  const postLimitReached = isBronze && post.length >= 5;
  console.log(userDb?.status)


  return (
    <div className="w-full mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Post</h2>

      {/* 🔹 Show warning if Bronze limit reached */}
      {postLimitReached && (
        <div className="p-4 mb-4 text-red-600 font-semibold border border-red-400 rounded text-center">
          🚫 You’ve reached your post limit (Bronze users can only add 5 posts).
          Upgrade to Gold for unlimited posts.
        </div>
      )}

      {/* 🔹 Disable form if limit reached */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <fieldset disabled={postLimitReached} className="contents">
          {/* Author Image */}
          <div className="w-full">
            <label className="block font-semibold mb-1">Author Image URL</label>
            <input
              type="text"
              defaultValue={user?.photoURL || ""}
              {...register("authorImage", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.authorImage && (
              <p className="text-red-500 text-sm">Author image is required</p>
            )}
          </div>

          {/* Author Name */}
          <div className="w-full">
            <label className="block font-semibold mb-1">Author Name</label>
            <input
              type="text"
              defaultValue={user?.displayName || ""}
              {...register("authorName", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.authorName && (
              <p className="text-red-500 text-sm">Author name is required</p>
            )}
          </div>

          {/* Author Email */}
          <div className="w-full">
            <label className="block font-semibold mb-1">Author Email</label>
            <input
              type="email"
              defaultValue={user?.email || ""}
              {...register("authorEmail", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.authorEmail && (
              <p className="text-red-500 text-sm">Author email is required</p>
            )}
          </div>

          {/* Post Title */}
          <div className="w-full">
            <label className="block font-semibold mb-1">Post Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">Post title is required</p>
            )}
          </div>

          {/* Post Description */}
          <div className="w-full md:col-span-2">
            <label className="block font-semibold mb-1">Post Description</label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full"
              rows="4"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">Description is required</p>
            )}
          </div>

          {/* Tag */}
          <div className="w-full">
            <label className="block font-semibold mb-1">Tag</label>
            <select
              {...register("tag", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select a tag</option>
              <option value="technology">Technology</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="entertainment">Entertainment</option>
            </select>
            {errors.tag && (
              <p className="text-red-500 text-sm">Tag is required</p>
            )}
          </div>

          {/* Hidden Votes */}
          <input type="hidden" value={0} {...register("upVote")} />
          <input type="hidden" value={0} {...register("downVote")} />

          {/* Submit Button */}
          <div className="w-full md:col-span-2">
            <button type="submit" className="btn btn-primary w-full">
              Add Post
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AddPost;
