import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    letterNo: "",
    date: "",
    subject: "",
    role: "Sender",
    name: "",
    l: "",
    district: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      file: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("letterNo", formData.letterNo);
    form.append("date", formData.date);
    form.append("subject", formData.subject);
    form.append("role", formData.role);
    form.append("name", formData.name);
    form.append("location", formData.location);
    form.append("district", formData.district);
    form.append("file", formData.file);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        alert("Letter uploaded successfully!");
        setFormData({
          letterNo: "",
          date: "",
          subject: "",
          role: "Sender",
          name: "",
          location: "",
          district: "",
          file: null,
        });
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center px-2 relative"
      style={{
        backgroundImage: "url('/drdo-logo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#003366",
      }}
    >
      {/* Blurred overlay */}
      <div className="absolute inset-0 bg-[#003366] opacity-50 z-0 backdrop-blur-sm"></div>

      {/* Form box */}
      <div className="bg-white shadow-lg border border-gray-300 rounded-lg p-4 w-full max-w-xs z-10">
        <h1 className="text-lg font-bold text-[#003366] mb-3 text-center">
          Upload Letter
        </h1>

        <form onSubmit={handleSubmit} className="space-y-2 text-sm">
          <div>
            <label className="block font-semibold mb-1">DO/Letter No</label>
            <input
              type="text"
              name="letterNo"
              value={formData.letterNo}
              onChange={handleChange}
              className="w-full border border-gray-300 p-1 rounded text-xs"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 p-1 rounded text-xs"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 p-1 rounded text-xs"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Sender / Receiver</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 p-1 rounded text-xs"
            >
              <option>Sender</option>
              <option>Receiver</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-1 rounded text-xs"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 p-1 rounded text-xs"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full border border-gray-300 p-1 rounded text-xs"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Upload Document (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-1 rounded bg-white text-xs"
              required
            />
          </div>

          <div className="flex justify-between mt-3">
            <button
              type="submit"
              className="bg-[#003366] text-white px-3 py-1 text-xs rounded hover:bg-blue-900"
            >
              Upload
            </button>
            <button
              type="button"
              onClick={() => navigate("/view-letters")}
              className="bg-gray-700 text-white px-3 py-1 text-xs rounded hover:bg-gray-800"
            >
              View Letters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
