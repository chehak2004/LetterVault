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
    console.log("Form submitted:", formData);
    // Add your backend POST request here
  };

  return (
    <div className="w-screen h-screen bg-[#003366] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-xl font-bold text-[#003366] mb-4 text-center">
          Upload Official Letter
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label className="block font-semibold mb-1">DO/Letter Number</label>
            <input
              type="text"
              name="letterNo"
              value={formData.letterNo}
              onChange={handleChange}
              className="w-full border border-gray-300 p-1.5 rounded"
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
              className="w-full border border-gray-300 p-1.5 rounded"
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
              className="w-full border border-gray-300 p-1.5 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Sender / Receiver</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 p-1.5 rounded"
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
              className="w-full border border-gray-300 p-1.5 rounded"
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
              className="w-full border border-gray-300 p-1.5 rounded"
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
              className="w-full border border-gray-300 p-1.5 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Scan/Upload Document (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-1.5 rounded bg-white"
              required
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-[#003366] text-white px-3 py-1.5 rounded hover:bg-blue-900"
            >
              Upload
            </button>
            <button
              type="button"
              onClick={() => navigate("/view-letters")}
              className="bg-gray-700 text-white px-3 py-1.5 rounded hover:bg-gray-800"
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
