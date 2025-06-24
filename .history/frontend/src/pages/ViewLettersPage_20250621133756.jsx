import React, { useEffect, useState } from "react";

const ViewLetters = () => {
  const [letters, setLetters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/letters")
      .then((res) => res.json())
      .then((data) => setLetters(data))
      .catch((err) => console.error("Error fetching letters:", err));
  }, []);

  const handlePrint = (fileUrl) => {
    const printWindow = window.open(fileUrl, "_blank");
    if (printWindow) {
      printWindow.focus();
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  const filteredLetters = letters.filter((letter) =>
    Object.values(letter).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="w-screen min-h-screen bg-[#003366] py-10 px-4 flex justify-center items-start">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl shadow-lg">
        <h1 className="text-xl font-bold text-[#003366] mb-4 text-center">
          View Uploaded Letters
        </h1>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search letters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />
        </div>

        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-[#002244] text-white">
            <tr>
              <th className="px-3 py-2">Letter No</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Subject</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Location</th>
              <th className="px-3 py-2">District</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLetters.map((letter, index) => (
              <tr key={index} className="bg-white border-t text-center">
                <td className="px-3 py-2">{letter.letterNo}</td>
                <td className="px-3 py-2">{letter.date}</td>
                <td className="px-3 py-2">{letter.subject}</td>
                <td className="px-3 py-2">{letter.role}</td>
                <td className="px-3 py-2">{letter.name}</td>
                <td className="px-3 py-2">{letter.location}</td>
                <td className="px-3 py-2">{letter.district}</td>
                <td className="px-3 py-2 text-left text-blue-600">
                  <a
                    href={letter.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block hover:underline"
                  >
                    View PDF
                  </a>
                  <button
                    onClick={() => handlePrint(letter.fileUrl)}
                    className="block mt-1 text-blue-600 hover:underline"
                  >
                    Print
                  </button>
                </td>
              </tr>
            ))}
            {filteredLetters.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No matching letters found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewLetters;
