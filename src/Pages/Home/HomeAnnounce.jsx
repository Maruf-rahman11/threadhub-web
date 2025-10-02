import React from 'react';

import { useQuery } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';

const HomeAnnounce = () => {
    const axiosSecure = useAxios()
    // Fetch announcements
    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ["announcements"],
        queryFn: async () => {
            const res = await axiosSecure.get("/announcements");
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center mt-10">Loading announcements...</p>;

    return (
        <section className="max-w-6xl mx-auto mt-12 px-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">📢 Announcements</h2>
            
            {announcements.length === 0 ? (
                <p className="text-center text-gray-500 italic">No announcements yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {announcements.map((ann) => (
                        <div
                            key={ann._id}
                            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
                        >
                            <h3 className="font-semibold text-xl text-gray-800 mb-2">{ann.title}</h3>
                            <p className="text-gray-700 mb-4 line-clamp-3">{ann.message}</p>
                            <div className="text-sm text-gray-500">
                                Posted by <span className="font-medium">{ann.createdBy}</span> •{" "}
                                {new Date(ann.created_at).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default HomeAnnounce;
