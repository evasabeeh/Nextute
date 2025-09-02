import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import SidePanel from "./SidePanel";
import LoadingSpinner from "../LoadingSpinner";
import Navbar from "../Navbar";
import Footer from "../Footer";

const EditTeamMember = () => {
  const { certificateNo } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    certificateNo: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    joiningDate: "",
    designation: "",
    department: "",
    image: "",
    certificateURL: "",
    achievementsURL: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (certificateNo) {
      setLoading(true);
      fetch(`${apiUrl}/api/employees/member/${certificateNo}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch team member");
          return res.json();
        })
        .then((data) => {
          setEmployee({
            certificateNo: data.certificateNo || "",
            fullName: data.fullName || "",
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            joiningDate: data.joiningDate ? data.joiningDate.split("T")[0] : "",
            designation: data.designation || "",
            department: data.department || "",
            image: data.image || "",
            certificateURL: data.certificateURL || "",
            achievementsURL: data.achievementsURL || "",
          });
          setImagePreview(data.image || "");
        })
        .catch((err) => {
          toast.error("Failed to load team member: " + err.message);
        })
        .finally(() => setLoading(false));
    }
  }, [certificateNo, apiUrl]);

  const validateForm = () => {
    const errors = {};
    if (!employee.fullName.trim()) errors.fullName = "Full Name is required";
    if (!employee.designation.trim()) errors.designation = "Designation is required";
    if (!employee.email.trim() || !/^\S+@\S+\.\S+$/.test(employee.email))
      errors.email = "Valid email is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      let url;
      let method;
      let payload;
      if (certificateNo) {
        url = `${apiUrl}/api/employees/member/${certificateNo}`;
        method = "PUT";
        // Use FormData for image upload
        payload = new FormData();
        Object.entries(employee).forEach(([key, value]) => {
          if (key === "joiningDate" && value) {
            payload.append(key, new Date(value).toISOString());
          } else {
            payload.append(key, value);
          }
        });
        if (imageFile) {
          payload.append("image", imageFile);
        }
      } else {
        url = `${apiUrl}/api/employees/`;
        method = "POST";
        payload = JSON.stringify(employee);
      }
      const res = await fetch(url, {
        method,
        headers: certificateNo ? undefined : { "Content-Type": "application/json" },
        body: payload,
      });
      if (!res.ok) throw new Error(certificateNo ? "Failed to update team member" : "Failed to add team member");
      toast.success(certificateNo ? "Team member updated!" : "Team member added!", {
        position: "top-right",
        style: { background: "#E6EDE2", color: "#144E53", borderRadius: "8px" },
      });
      navigate("/admin/team");
    } catch (err) {
      toast.error("Failed to save team member", {
        position: "top-right",
        style: { background: "#E6EDE2", color: "#144E53", borderRadius: "8px" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  if (loading) return <LoadingSpinner />;

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
            className="bg-white bg-opacity-95 backdrop-blur-xl rounded-2xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-[#2D7A66]/10"
          >
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#144E53]">
              {certificateNo ? "Edit Team Member" : "Add Team Member"}
            </h1>
          </motion.div>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="bg-white bg-opacity-95 backdrop-blur-xl rounded-2xl shadow-xl p-4 sm:p-6 border border-[#2D7A66]/10"
          >
            <div className="space-y-4 sm:space-y-6">
              <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="text-sm sm:text-base font-medium text-[#144E53] capitalize w-24">Certificate No</label>
                <div className="flex-1">
                  <input type="text" name="certificateNo" value={employee.certificateNo} onChange={handleChange} className="w-full p-3 border border-[#2D7A66] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93E9A2] transition-all bg-[#E6EDE2] text-gray-700 text-sm sm:text-base" placeholder="Enter Certificate No" aria-label="Certificate No" />
                  {formErrors.certificateNo && <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.certificateNo}</p>}
                </div>
              </motion.div>
              <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="text-sm sm:text-base font-medium text-[#144E53] capitalize w-24">Full Name</label>
                <div className="flex-1">
                  <input type="text" name="fullName" value={employee.fullName} onChange={handleChange} className="w-full p-3 border border-[#2D7A66] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93E9A2] transition-all bg-[#E6EDE2] text-gray-700 text-sm sm:text-base" placeholder="Enter Full Name" aria-label="Full Name" />
                  {formErrors.fullName && <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.fullName}</p>}
                </div>
              </motion.div>
              <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="text-sm sm:text-base font-medium text-[#144E53] capitalize w-24">Email</label>
                <div className="flex-1">
                  <input type="email" name="email" value={employee.email} onChange={handleChange} className="w-full p-3 border border-[#2D7A66] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93E9A2] transition-all bg-[#E6EDE2] text-gray-700 text-sm sm:text-base" placeholder="Enter Email" aria-label="Email" />
                  {formErrors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.email}</p>}
                </div>
              </motion.div>
              <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="text-sm sm:text-base font-medium text-[#144E53] capitalize w-24">Phone Number</label>
                <div className="flex-1">
                  <input type="text" name="phoneNumber" value={employee.phoneNumber} onChange={handleChange} className="w-full p-3 border border-[#2D7A66] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93E9A2] transition-all bg-[#E6EDE2] text-gray-700 text-sm sm:text-base" placeholder="Enter Phone Number" aria-label="Phone Number" />
                </div>
              </motion.div>
              <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="text-sm sm:text-base font-medium text-[#144E53] capitalize w-24">Joining Date</label>
                <div className="flex-1">
                  <input type="date" name="joiningDate" value={employee.joiningDate} onChange={handleChange} className="w-full p-3 border border-[#2D7A66] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93E9A2] transition-all bg-[#E6EDE2] text-gray-700 text-sm sm:text-base" aria-label="Joining Date" />
                </div>
              </motion.div>
              <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="text-sm sm:text-base font-medium text-[#144E53] capitalize w-24">Designation</label>
                <div className="flex-1">
                  <input type="text" name="designation" value={employee.designation} onChange={handleChange} className="w-full p-3 border border-[#2D7A66] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93E9A2] transition-all bg-[#E6EDE2] text-gray-700 text-sm sm:text-base" placeholder="Enter Designation" aria-label="Designation" />
                  {formErrors.designation && <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.designation}</p>}
                </div>
              </motion.div>
              <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="text-sm sm:text-base font-medium text-[#144E53] capitalize w-24">Department</label>
                <div className="flex-1">
                  <input type="text" name="department" value={employee.department} onChange={handleChange} className="w-full p-3 border border-[#2D7A66] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93E9A2] transition-all bg-[#E6EDE2] text-gray-700 text-sm sm:text-base" placeholder="Enter Department" aria-label="Department" />
                </div>
              </motion.div>
              <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="text-sm sm:text-base font-medium text-[#144E53] capitalize w-24">Image</label>
                <div className="flex-1">
                  <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="w-full p-3 border border-[#2D7A66] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93E9A2] transition-all bg-[#E6EDE2] text-gray-700 text-sm sm:text-base" aria-label="Image" />
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-full object-cover mt-2" />
                  )}
                </div>
              </motion.div>
              <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="text-sm sm:text-base font-medium text-[#144E53] capitalize w-24">Certificate URL</label>
                <div className="flex-1">
                  <input type="text" name="certificateURL" value={employee.certificateURL} onChange={handleChange} className="w-full p-3 border border-[#2D7A66] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93E9A2] transition-all bg-[#E6EDE2] text-gray-700 text-sm sm:text-base" placeholder="Enter Certificate URL" aria-label="Certificate URL" />
                </div>
              </motion.div>
              <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="text-sm sm:text-base font-medium text-[#144E53] capitalize w-24">Achievements URL</label>
                <div className="flex-1">
                  <input type="text" name="achievementsURL" value={employee.achievementsURL} onChange={handleChange} className="w-full p-3 border border-[#2D7A66] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93E9A2] transition-all bg-[#E6EDE2] text-gray-700 text-sm sm:text-base" placeholder="Enter Achievements URL" aria-label="Achievements URL" />
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex justify-end gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => navigate("/admin/team")}
                className="px-4 sm:px-6 py-2 bg-[#E6EDE2] text-[#144E53] rounded-lg border border-[#2D7A66] hover:bg-[#93E9A2] transition-all duration-300 text-sm sm:text-base min-w-[48px] min-h-[48px]"
                aria-label="Cancel"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className={`px-4 sm:px-6 py-2 bg-gradient-to-r from-[#2D7A66] to-[#144E53] text-white rounded-lg shadow-md hover:from-[#144E53] hover:to-[#2D7A66] transition-all duration-300 text-sm sm:text-base min-w-[48px] min-h-[48px] ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
                aria-label="Save Team Member"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default EditTeamMember;
