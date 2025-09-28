import { useState, useRef, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

const generateAvatarSVG = (initials) => {
  console.log("Generating SVG for initials:", initials);
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="64" fill="#14b8a6"/>
      <text x="64" y="80" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
    </svg>
  `)}`;
};

const ProfilePictureUpload = ({ currentPic, onUpdate, initials }) => {
  const [uploading, setUploading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log("File selected:", file);
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("profilePic", file);
      console.log("FormData created with file:", file.name, "size:", file.size);

      console.log("Making axios request to upload profile pic");
      const response = await axiosInstance.post("/users/upload-profile-pic", formData);
      console.log("Upload response:", response.data);

      console.log("Calling onUpdate with:", response.data.profilePic);
      onUpdate(response.data.profilePic);
      alert("Profile picture uploaded successfully");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture");
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleReset = async () => {
    try {
      await axiosInstance.put("/users/profile", { profilePic: "" });
      onUpdate("");
      alert("Profile picture reset successfully");
    } catch (error) {
      console.error("Error resetting profile picture:", error);
      alert("Failed to reset profile picture");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const displayPic = currentPic || generateAvatarSVG(initials || "JD");
  console.log("ProfilePictureUpload render - currentPic:", currentPic, "initials:", initials, "displayPic starts with:", displayPic.substring(0, 50));

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="dropdown-container relative">
        <img
          src={displayPic}
          alt="Profile"
          className="h-32 w-32 rounded-full border-4 border-base-100 shadow-xl cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        />
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
        {showDropdown && (
          <div className="absolute top-full mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
            <button
              onClick={() => { triggerFileInput(); setShowDropdown(false); }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-teal-600"
            >
              Upload Picture
            </button>
            <button
              onClick={() => { handleReset(); setShowDropdown(false); }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-teal-600"
            >
              Reset Picture
            </button>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ProfilePictureUpload;