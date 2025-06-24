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
    location: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // You will send this data to backend using fetch or axios later
  };

  return (
    <div className="w-screen h-screen bg-[#003366] flex items-center justify-center">
      <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#003366] mb-6 text-center">
          Upload Official Letter
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">DO/Letter Number</label>
            <input
              type="text"
              name="letterNo"
              value={formData.letterNo}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded text-sm"
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
              className="w-full border border-gray-300 p-2 rounded text-sm"
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
              className="w-full border border-gray-300 p-2 rounded text-sm"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Sender / Receiver</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded text-sm"
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
              className="w-full border border-gray-300 p-2 rounded text-sm"
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
              className="w-full border border-gray-300 p-2 rounded text-sm"
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
              className="w-full border border-gray-300 p-2 rounded text-sm"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Scan/Upload Document (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-2 rounded text-sm bg-white"
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-[#003366] text-white px-4 py-2 rounded hover:bg-blue-900 text-sm"
            >
              Upload Details
            </button>
            <button
              type="button"
              onClick={() => navigate("/view-letters")}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 text-sm"
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
