import React, { useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllAnnouncements = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedAnn, setSelectedAnn] = useState(null); // For modal

  // Fetch announcements
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });
 console.log(announcements.length)
  const handleDelete = (id) => {
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
          const res = await axiosSecure.delete(`/announcements/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Announcement has been deleted.", "success");
            queryClient.setQueryData(["announcements"], oldData =>
              oldData.filter(ann => ann._id !== id)
            );
          }
        } catch (error) {
          console.error("Error deleting announcement:", error);
          Swal.fire("Error!", "Failed to delete announcement.", "error");
        }
      }
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading announcements...</p>;

  return (
    <div className="w-full mx-auto mt-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">📢 All Announcements</h2>
      {announcements.length === 0 ? (
        <p className="text-center text-gray-500 italic">No announcements yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Message</th>
                <th>Created By</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((ann, index) => (
                <tr key={ann._id}>
                  <td>{index + 1}</td>
                  <td>{ann.title}</td>
                  <td>
                    {ann.message.length > 50 ? (
                      <>
                        {ann.message.slice(0, 50)}...
                        <button
                          className="btn btn-link text-blue-600"
                          onClick={() => setSelectedAnn(ann)}
                        >
                          See More
                        </button>
                      </>
                    ) : (
                      ann.message
                    )}
                  </td>
                  <td>{ann.createdBy}</td>
                  <td>{new Date(ann.created_at).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(ann._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedAnn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <h2 className="text-xl font-bold mb-4">{selectedAnn.title}</h2>
            <p className="text-gray-700 mb-4">{selectedAnn.message}</p>
            <button
              onClick={() => setSelectedAnn(null)}
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

export default AllAnnouncements;
