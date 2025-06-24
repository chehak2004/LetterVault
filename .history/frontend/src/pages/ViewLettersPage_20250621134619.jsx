import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewLetters = () => {
  const [letters, setLetters] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/letters")
      .then((res) => res.json())
      .then((data) => setLetters(data))
      .catch((err) => console.error("Error fetching letters:", err));
  }, []);

  const filteredLetters = letters.filter((letter) =>
    Object.values(letter).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const handlePrint = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = blobUrl;
      document.body.appendChild(iframe);

      iframe.onload = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        URL.revokeObjectURL(blobUrl);
        document.body.removeChild(iframe);
      };
    } catch (error) {
      console.error("Print error:", error);
    }
  };

  const handleEdit = (letter) => {
    navigate(`/edit-letter/${letter._id}`);
  };

  return (
    <div className="min-h-screen w-full bg-[#003366] flex items-center justify-center px-4 py-6">
      <div className="flex flex-col items-center w-full max-w-7xl">
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          View Uploaded Letters
        </h2>

        <div className="w-full flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by any detail (e.g., Letter No, Name, Subject, Date, etc.)"
            className="w-full max-w-xl p-2 rounded text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full bg-white rounded shadow text-sm text-center">
            <thead className="bg-[#003366] text-white">
              <tr>
                <th className="p-2">Letter No</th>
                <th className="p-2">Date</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Sender/Receiver</th>
                <th className="p-2">Name</th>
                <th className="p-2">Location</th>
                <th className="p-2">District</th>
                <th className="p-2">View PDF</th>
                <th className="p-2">Print PDF</th>
                <th className="p-2">Download</th>
                <th className="p-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredLetters.length > 0 ? (
                filteredLetters.map((letter, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{letter.letterNo}</td>
                    <td className="p-2">{letter.date}</td>
                    <td className="p-2">{letter.subject}</td>
                    <td className="p-2">{letter.role}</td>
                    <td className="p-2">{letter.name}</td>
                    <td className="p-2">{letter.location}</td>
                    <td className="p-2">{letter.district}</td>
                    <td className="p-2">
                      <a
                        href={letter.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handlePrint(letter.fileUrl)}
                        className="text-blue-600 underline"
                      >
                        Print
                      </button>
                    </td>
                    <td className="p-2">
                      <a
                        href={letter.fileUrl}
                        download
                        className="text-green-600 underline"
                      >
                        Download
                      </a>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleEdit(letter)}
                        className="text-yellow-600 underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="p-4 text-gray-500">
                    No letters found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewLetters;
