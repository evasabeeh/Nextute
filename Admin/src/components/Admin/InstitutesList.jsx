import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import SidePanel from "./SidePanel";
import LoadingSpinner from "../LoadingSpinner.jsx";
import Navbar from "../Navbar.jsx";
import { FaSearch, FaFilter } from "react-icons/fa";
import useAdminData from "../../hooks/useAdminData";

const InstitutesList = () => {
  const { adminData, dataLoading, error, hasRenderedOnce } = useAdminData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedInstitutesList");
    if (hasVisited) {
      toast(
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <div>
            <h3 className="text-lg font-semibold text-[#144E53]">
              Welcome Back!
            </h3>
            <p className="text-sm text-gray-600">Manage all institutes here.</p>
          </div>
        </div>,
        {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#E6EDE2",
            color: "#144E53",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            maxWidth: "90vw",
          },
        }
      );
    }
    localStorage.setItem("hasVisitedInstitutesList", "true");
  }, []);

  const handleDelete = async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Institute deleted successfully!", {
        position: "top-right",
        style: { background: "#E6EDE2", color: "#144E53", borderRadius: "8px" },
      });
    } catch (err) {
      toast.error("Failed to delete institute", {
        position: "top-right",
        style: { background: "#E6EDE2", color: "#144E53", borderRadius: "8px" },
      });
    }
  };

  const filteredInstitutes = adminData?.institutes?.filter(
    (institute) =>
      institute.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCity
        ? institute.city.toLowerCase() === filterCity.toLowerCase()
        : true)
  );

  if (dataLoading || !hasRenderedOnce) return <LoadingSpinner />;
  if (error || !adminData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-red-600 text-lg md:text-xl font-semibold px-4 text-center">
        Error loading institutes. Please try again.
      </div>
    );
  }

  const cities = [...new Set(adminData.institutes.map((inst) => inst.city))];

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
        <SidePanel />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#144E53]">
              Institutes
            </h1>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search institutes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-[#2D7A66]/20 focus:ring-2 focus:ring-[#2D7A66] focus:outline-none w-full sm:w-64 bg-white bg-opacity-95 shadow-sm"
                  aria-label="Search institutes"
                />
              </div>
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="px-4 py-2 rounded-lg border border-[#2D7A66]/20 focus:ring-2 focus:ring-[#2D7A66] focus:outline-none bg-white bg-opacity-95 shadow-sm"
                aria-label="Filter by city"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/admin/institutes/add")}
                className="px-4 sm:px-6 py-2 bg-gradient-to-r from-[#2D7A66] to-[#144E53] text-white rounded-lg shadow-md hover:from-[#144E53] hover:to-[#2D7A66] transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
                aria-label="Add New Institute"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="hidden sm:inline">Add Institute</span>
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="bg-white bg-opacity-95 backdrop-blur-xl rounded-2xl shadow-xl p-4 sm:p-6 border border-[#2D7A66]/10 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-[#E6EDE2] z-10">
                  <tr className="text-[#144E53] border-b border-[#2D7A66]/20">
                    <th className="p-4 text-sm md:text-base font-semibold">
                      Name
                    </th>
                    <th className="p-4 text-sm md:text-base font-semibold hidden sm:table-cell">
                      City
                    </th>
                    <th className="p-4 text-sm md:text-base font-semibold hidden md:table-cell">
                      Courses
                    </th>
                    <th className="p-4 text-sm md:text-base font-semibold hidden lg:table-cell">
                      Students
                    </th>
                    <th className="p-4 text-sm md:text-base font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInstitutes?.length > 0 ? (
                    filteredInstitutes.map((institute, index) => (
                      <motion.tr
                        key={institute.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-[#2D7A66]/10 hover:bg-[#E6EDE2] transition-all duration-200 cursor-pointer rounded-lg"
                        onClick={() =>
                          navigate(`/admin/institute/dashboard/${institute.id}`)
                        }
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            navigate(
                              `/admin/institute/dashboard/${institute.id}`
                            );
                          }
                        }}
                        aria-label={`View details for ${institute.name}`}
                      >
                        <td className="p-4 text-sm md:text-base font-medium text-[#144E53] truncate">
                          {institute.name}
                        </td>
                        <td className="p-4 text-sm md:text-base hidden sm:table-cell truncate">
                          {institute.city}
                        </td>
                        <td className="p-4 text-sm md:text-base hidden md:table-cell truncate">
                          {institute.courses}
                        </td>
                        <td className="p-4 text-sm md:text-base hidden lg:table-cell truncate">
                          {institute.students}
                        </td>
                        <td className="p-4 flex gap-2 items-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/admin/institutes/edit/${institute.id}`
                              );
                            }}
                            className="p-2 bg-[#2D7A66] text-white rounded-lg hover:bg-[#144E53] transition-all duration-200"
                            aria-label={`Edit ${institute.name}`}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(institute.id);
                            }}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                            aria-label={`Delete ${institute.name}`}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-gray-600">
                        No institutes found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default InstitutesList;
