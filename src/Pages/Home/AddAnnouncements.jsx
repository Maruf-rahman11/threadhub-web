import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddAnnouncements = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // // Fetch announcements
  // const { data: announcements = [], isLoading } = useQuery({
  //   queryKey: ["announcements"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get("/announcements");
  //     return res.data;
  //   },
  // });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Mutation to post new announcement
  const addAnnouncement = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/announcements", data);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Announcement added!",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      queryClient.invalidateQueries(["announcements"]);
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Failed to add announcement",
        text: err.response?.data?.message || err.message,
      });
    },
  });

  const onSubmit = (data) => {
    addAnnouncement.mutate({ ...data, createdBy: "Admin" });
  };

  return (
    <div className="w-full mx-auto mt-12 px-6">
      {/* Announcement Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          📢 Add New Announcement
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
          </div>

          <div>
            <label className="block font-semibold mb-1">Message</label>
            <textarea
              {...register("message", { required: true })}
              className="textarea textarea-bordered w-full"
              rows={4}
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm">Message is required</p>}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Post Announcement
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAnnouncements;
