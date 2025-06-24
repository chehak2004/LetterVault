import React, { useEffect, useState } from "react";

const ViewLetters = () => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    // Dummy data (replace with API call later)
    setLetters([
      {
        id: 1,
        letterNo: "DRDO/001",
        date: "2025-06-21",
        subject: "Test Subject",
        role: "Sender",
        name: "Dr. A. Sharma",
        location: "Delhi HQ",
        district: "New Delhi",
        fileUrl: "#", // later replace with actual PDF URL
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-[#003366] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl p-4">
        <h1 className="text-xl font-bold text-[#003366] mb-4 text-center">
          View Uploaded Letters
        </h1>

        <table className="w-full table-auto text-sm text-left border border-gray-300">
          <thead className="bg-[#003366] text-white">
            <tr>
              <th className="p-2">Letter No</th>
              <th className="p-2">Date</th>
              <th className="p-2">Subject</th>
              <th className="p-2">Role</th>
              <th className="p-2">Name</th>
              <th className="p-2">Location</th>
              <th className="p-2">District</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {letters.map((letter) => (
              <tr key={letter.id} className="border-t hover:bg-gray-100">
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
                    rel="noreferrer"
                    className="text-blue-600 hover:underline text-xs"
                  >
                    View PDF
                  </a>
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
