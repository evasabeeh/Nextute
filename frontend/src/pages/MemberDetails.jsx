import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { User, Badge, Mail, ArrowLeft } from "lucide-react";
import axios from "axios";
import QRCode from "qrcode";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { FaSpinner } from "react-icons/fa";

const MemberDetails = () => {
  const { certificateNo } = useParams();
  const [member, setMember] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { VITE_BACKEND_BASE_URL } = useContext(AppContext);

  useEffect(() => {
    const fetchMember = async () => {
      if (!certificateNo || certificateNo === "undefined") {
        console.error("Invalid certificateNo:", certificateNo);
        navigate("/team");
        return;
      }
      try {
        const { data } = await axios.get(
          `${VITE_BACKEND_BASE_URL}/api/employees/member/${certificateNo}`
        );
        console.log("Member data received:", data);
        setMember(data);

        const url = `http://www.nextute.com/team/${certificateNo}`;
        const qrUrl = await QRCode.toDataURL(url, {
          width: window.innerWidth < 640 ? 120 : 180,
        });
        setQrCodeUrl(qrUrl);
        console.log(`QR code generated for ${data.fullName}: ${url}`);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching member:", err);
        navigate("/team");
      }
    };
    fetchMember();
  }, [certificateNo, navigate, VITE_BACKEND_BASE_URL]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E6EDE2] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaSpinner size={32} className="text-[#2D7A66]" />
        </motion.div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-[#E6EDE2] flex items-center justify-center">
        <p className="text-lg md:text-xl text-[#144E53] font-semibold">
          Member not found
        </p>
      </div>
    );
  }

  const imageUrl = member.image?.includes("drive.google.com")
    ? member.image.replace("/view?usp=drive_link", "/uc?export=view")
    : member.image;

  return (
    <div className="min-h-screen bg-[#E6EDE2] font-sans">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 border border-[#93E9A2]/30"
        >
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 md:gap-2 text-[#144E53] bg-[#93E9A2]/20 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6 hover:bg-[#93E9A2]/40 transition-all duration-300 text-sm md:text-base"
            onClick={() => navigate("/team")}
            aria-label="Back to Team"
          >
            <ArrowLeft size={18} />
            Back to Team
          </motion.button>

          <div className="flex flex-col items-center space-y-4 md:space-y-6">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-40 sm:w-48 md:w-52 lg:w-56 h-40 sm:h-48 md:h-52 lg:h-56 rounded-full overflow-hidden ring-4 ring-[#93E9A2]/50"
            >
              {imageUrl && !imageUrl.includes("example.com") ? (
                <img
                  src={imageUrl}
                  alt={member.fullName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log(
                      `Failed to load image for ${member.fullName}: ${imageUrl}`
                    );
                  }}
                  onLoad={() =>
                    console.log(
                      `Image loaded successfully for ${member.fullName}`
                    )
                  }
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#93E9A2]/30 to-[#2D7A66]/30">
                  <User size={40} className="text-[#144E53]" />
                </div>
              )}
            </motion.div>

            <div className="text-center space-y-3 md:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#144E53]">
                {member.fullName}
              </h2>
              <div className="flex items-center justify-center gap-1.5 md:gap-2 text-sm md:text-base text-[#2D7A66]">
                <Badge size={16} />
                <span className="font-medium">{member.idNo}</span>
              </div>
              <p className="text-sm md:text-lg font-semibold text-[#144E53]">
                {member.designation}
              </p>
              {member.department && (
                <p className="text-sm md:text-base text-[#2D7A66]">
                  Department: {member.department}
                </p>
              )}
              {member.email && (
                <div className="flex items-center justify-center gap-1.5 md:gap-2 text-sm md:text-base text-[#2D7A66]">
                  <Mail size={14} />
                  <span className="truncate">{member.email}</span>
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 md:mt-6 w-full"
            >
              <h3 className="text-lg md:text-xl font-bold text-[#144E53] mb-3 md:mb-4">
                Achievements
              </h3>
              <div className="bg-[#E6EDE2]/50 rounded-2xl p-4 md:p-6">
                <p className="text-xs md:text-sm text-[#2D7A66]">
                  {member.fullName} has contributed significantly to{" "}
                  {member.department || "the team"}.
                  <br />
                  Notable achievements will be displayed here soon.
                </p>
              </div>
            </motion.div>

            {qrCodeUrl ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-4 md:mt-6"
              >
                <img
                  src={qrCodeUrl}
                  alt={`${member.fullName}'s QR Code`}
                  className="w-24 sm:w-28 md:w-32 lg:w-36 h-24 sm:h-28 md:h-32 lg:h-36 mx-auto rounded-lg shadow-md border border-[#93E9A2]/30"
                  onError={(e) => {
                    console.log(
                      `Failed to load QR code for ${
                        member.fullName
                      }: ${qrCodeUrl.substring(0, 30)}...`
                    );
                  }}
                  onLoad={() =>
                    console.log(
                      `QR code loaded successfully for ${member.fullName}`
                    )
                  }
                />
                <p className="text-xs md:text-sm text-[#2D7A66] mt-2">
                  Scan to share profile
                </p>
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2 px-4 md:px-6 py-2 bg-[#93E9A2]/90 text-[#144E53] rounded-full text-xs md:text-sm font-semibold hover:bg-[#E6EDE2] transition-all duration-300"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = qrCodeUrl;
                    link.download = `${member.fullName}-qrcode.png`;
                    link.click();
                  }}
                  aria-label="Download QR Code"
                >
                  Download QR Code
                </motion.button>
              </motion.div>
            ) : (
              <p className="text-xs md:text-sm text-[#2D7A66] mt-2">
                Generating QR Code...
              </p>
            )}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default MemberDetails;
