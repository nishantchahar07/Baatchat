import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { axiosInstance } from "../lib/axios";

const generateAvatarSVG = (initials) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="64" fill="#14b8a6"/>
      <text x="64" y="80" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
    </svg>
  `)}`;
};

const ProfilePictureUpload = ({ currentPic, onUpdate, initials, user, currentUserId }) => {
  const [uploading, setUploading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const fileInputRef = useRef(null);
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("profilePic", file);
      const response = await axiosInstance.post("/users/upload-profile-pic", formData);
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
    console.log(user, currentUserId);
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
      if (
        avatarRef.current && !avatarRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
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

  useEffect(() => {
    if (showDropdown && avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8 + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [showDropdown]);

  const displayPic = currentPic || generateAvatarSVG(initials || "JD");
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="dropdown-container relative">
        <img
          ref={avatarRef}
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
        {showDropdown && ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              zIndex: 50,
            }}
            className="bg-slate-800 border border-slate-600 rounded-md shadow-lg"
          >
            <button
              onClick={() => { triggerFileInput(); setShowDropdown(false); }}
              className="block w-full text-left px-4 py-2 text-slate-200 hover:bg-slate-700"
            >
              Upload Picture
            </button>
            <button
              onClick={() => { handleReset(); setShowDropdown(false); }}
              className="block w-full text-left px-4 py-2 text-slate-200 hover:bg-slate-700"
            >
              Reset Picture
            </button>
          </div>,
          document.body
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