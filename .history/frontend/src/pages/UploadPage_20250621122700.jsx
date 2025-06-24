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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#003366] p-4">
      {/* Form Background with Logo */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Blurred Logo inside Form Container */}
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-10 blur-sm z-0"
          style={{ backgroundImage: "url('/drdo-logo.png')" }}
        ></div>

        {/* Form Content */}
        <div className="relative z-10">
          <h1 className="text-lg font-bold text-[#003366] mb-4 text-center">Upload Letter</h1>
          <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            <Input label="DO/Letter No" name="letterNo" value={formData.letterNo} onChange={handleChange} />
            <Input label="Date" type="date" name="date" value={formData.date} onChange={handleChange} />
            <Input label="Subject" name="subject" value={formData.subject} onChange={handleChange} />
            <Select label="Sender / Receiver" name="role" value={formData.role} onChange={handleChange} />
            <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
            <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
            <Input label="District" name="district" value={formData.district} onChange={handleChange} />
            <FileInput label="Upload Document (PDF)" onChange={handleFileChange} />
            <div className="flex justify-between pt-2">
              <button type="submit" className="bg-[#003366] text-white px-3 py-1 text-xs rounded hover:bg-blue-900">
                Upload
              </button>
              <button type="button" onClick={() => navigate("/view-letters")} className="bg-gray-700 text-white px-3 py-1 text-xs rounded hover:bg-gray-800">
                View Letters
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Helper components
const Input = ({ label, type = "text", ...props }) => (
  <div>
    <label className="block font-semibold mb-1">{label}</label>
    <input
      type={type}
      {...props}
      className="w-full border border-gray-300 p-1 rounded text-xs"
      required
    />
  </div>
);

const Select = ({ label, ...props }) => (
  <div>
    <label className="block font-semibold mb-1">{label}</label>
    <select {...props} className="w-full border border-gray-300 p-1 rounded text-xs">
      <option>Sender</option>
      <option>Receiver</option>
    </select>
  </div>
);

const FileInput = ({ label, ...props }) => (
  <div>
    <label className="block font-semibold mb-1">{label}</label>
    <input
      type="file"
      accept=".pdf"
      {...props}
      className="w-full border border-gray-300 p-1 rounded bg-white text-xs"
      required
    />
  </div>
);

export default UploadPage;
