import React, { useEffect, useState } from "react";
import {
  FaAddressBook,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import axios from "axios";

const InstituteOverviewContactInfo = ({ id }) => {
  const [contact, setContact] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchContactInfo = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/institutes/${id}`);
        if (res.data?.status) {
          const data = res.data.data;
          setContact({
            phone: data.contact,
            email: data.email,
            address: data.contact_details?.headOffice?.address,
          });
        } else {
          setError("Invalid response received.");
        }
      } catch (err) {
        setError("Failed to load contact information.");
      }
    };

    fetchContactInfo();
  }, [id]);

  if (!id) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: Institute ID is missing.
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="text-center text-gray-700 p-4">
        Loading contact information...
      </div>
    );
  }

  return (
    <div className="bg-[#E6EDE2] rounded-2xl border border-black p-6 max-w-md m-2 sm:m-8 sm:ml-0 sm:mr-8">
      <div className="flex flex-col items-center text-center">
        <FaAddressBook className="text-4xl text-[#2D7B67] mb-2" />
        <h2 className="text-xl font-semibold text-gray-800">Contact Info</h2>
      </div>

      {/* Phone */}
      <div className="flex justify-between items-start border-t border-gray-600 mt-6 pt-4">
        <div className="flex gap-3">
          <FaPhoneAlt className="text-[#2D7B67] text-2xl mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800">Phone Number</h3>
            <p className="text-sm text-gray-700">{contact.phone || "N/A"}</p>
          </div>
        </div>
        <button className="text-sm text-gray-700 underline">Edit</button>
      </div>

      {/* Email */}
      <div className="flex justify-between items-start border-t border-gray-600 mt-6 pt-4">
        <div className="flex gap-3">
          <FaEnvelope className="text-[#2D7B67] text-2xl mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800">Email Address</h3>
            <p className="text-sm text-gray-700">{contact.email || "N/A"}</p>
          </div>
        </div>
        <button className="text-sm text-gray-700 underline">Edit</button>
      </div>

      {/* Address */}
      <div className="flex justify-between items-start border-t border-gray-600 mt-6 pt-4">
        <div className="flex gap-3">
          <FaMapMarkerAlt className="text-[#2D7B67] text-3xl mt-1" />
          <p className="text-sm text-gray-700">{contact.address || "N/A"}</p>
        </div>
        <button className="text-sm text-gray-700 underline whitespace-nowrap">
          Edit
        </button>
      </div>
    </div>
  );
};

export default InstituteOverviewContactInfo;