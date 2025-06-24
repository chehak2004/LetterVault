import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    letterNo: "",
    date: "",
    subject: "",
    role: "Sender",
    name: "",
    location: "",
    district: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    // Connect to backend here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#003366] px-4 py-12">
      <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-[#003366] mb-6 text-center">
          Upload Official Letter
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* DO/Letter Number */}
          <div>
            <label className="block font-semibold mb-1">DO/Letter Number</label>
            <input
              type="text"
              name="letterNo"
              value={formData.letterNo}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block font-semibold mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block font-semibold mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Sender/Receiver */}
          <div>
            <label className="block font-semibold mb-1">Sender / Receiver</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option>Sender</option>
              <option>Receiver</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* District */}
          <div>
            <label className="block font-semibold mb-1">District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-semibold mb-1">
              Scan/Upload Document (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full border p-2 rounded bg-white"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-[#003366] text-white px-4 py-2 rounded hover:bg-blue-900"
            >
              Upload Details
            </button>
            <button
              type="button"
              onClick={() => navigate("/view-letters")}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              View Letters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
