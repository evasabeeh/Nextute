import React from "react";
import StatCard from "../../components/StatCard";
import { GraduationCap, Users, Building2, Star } from "lucide-react";

export default function Dashboard() {
  // TODO: Replace with API counts
  const stats = [
    {
      icon: <Users className="w-5 h-5" />,
      label: "Total Students",
      value: 1240,
      trend: "+4.1% this week",
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      label: "Total Institutes",
      value: 36,
      trend: "+1 new",
    },
    { icon: <Star className="w-5 h-5" />, label: "Reviews", value: 512 },
    {
      icon: <Building2 className="w-5 h-5" />,
      label: "Active Jobs",
      value: 12,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Welcome back, Admin 👋</h2>
        <p className="text-neutral-600">
          Here’s what’s happening with Nextute today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* You can drop charts here later */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-2xl border min-h-[200px]">
          Recent activity
        </div>
        <div className="p-4 bg-white rounded-2xl border min-h-[200px]">
          System status
        </div>
      </div>
    </div>
  );
}
