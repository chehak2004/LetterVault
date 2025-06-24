import React, { useEffect, useState } from "react";

const ViewLetters = () => {
  const [letters, setLetters] = useState([]);

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
      printWindow.print();
    }
  };

  return (
    <div className="w-screen h-screen bg-[#003366] flex items-center justify-center px-2">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-xl font-bold text-[#003366] mb-4 text-center">
          View Uploaded Letters
        </h1>
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
            {letters.map((letter, index) => (
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewLetters;
