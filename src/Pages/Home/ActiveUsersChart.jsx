import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data — replace with your API or state data
const data = [
  { day: "Mon", activeUsers: 120 },
  { day: "Tue", activeUsers: 200 },
  { day: "Wed", activeUsers: 150 },
  { day: "Thu", activeUsers: 300 },
  { day: "Fri", activeUsers: 250 },
  { day: "Sat", activeUsers: 400 },
  { day: "Sun", activeUsers: 350 },
];

const ActiveUsersChart = () => {
  return (
    <section className="py-12 bg-base-100 rounded-lg shadow-md mx-4 md:mx-8 lg:mx-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Active Users Per Day
      </h2>
      <div className="w-full h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="activeUsers"
              stroke="#4f46e5" // Tailwind Indigo-600
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ActiveUsersChart;
