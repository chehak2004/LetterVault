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
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) data.append(key, formData[key]);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        alert("Letter uploaded successfully!");
        navigate("/view-letters");
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading letter.");
    }
  };

  return (
    <div className="w-screen h-screen bg-[#003366] flex items-center justify-center relative overflow-hidden px-2">
      {/* Background DRDO logo */}
      <img
        src="/logo.png"
        alt="DRDO Logo"
        className="absolute w-full h-full object-contain opacity-10 blur-sm"
        style={{ zIndex: 0 }}
      />

      {/* Upload Form */}
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 w-full max-w-xs z-10">
        <h1 className="text-lg font-bold text-[#003366] mb-3 text-center">
          Upload Letter
        </h1>

        <form onSubmit={handleSubmit} className="space-y-2 text-sm">
          {[
            { label: "DO/Letter No", name: "letterNo", type: "text" },
            { label: "Date", name: "date", type: "date" },
            { label: "Subject", name: "subject", type: "text" },
            { label: "Name", name: "name", type: "text" },
            { label: "Location", name: "location", type: "text" },
            { label: "District", name: "district", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block font-semibold mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-1 rounded text-xs"
                required
              />
            </div>
          ))}

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
