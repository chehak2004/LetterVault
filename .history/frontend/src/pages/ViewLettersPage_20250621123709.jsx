import React from "react";

const ViewLetters = () => {
  const letters = [
    {
      letterNo: "DRDO/001",
      date: "2025-06-21",
      subject: "Test Subject",
      role: "Sender",
      name: "Dr. A. Sharma",
      location: "Delhi HQ",
      district: "New Delhi",
      fileUrl: "https://example.com/sample.pdf", // Replace with actual PDF URL
    },
  ];

  return (
    <div className="min-h-screen w-screen bg-[#003366] flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 w-full max-w-5xl overflow-x-auto">
        <h2 className="text-xl font-bold text-[#003366] mb-4 text-center">
          View Uploaded Letters
        </h2>
        <table className="table-auto w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-[#003366] text-white">
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
            {letters.map((letter, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-2">{letter.letterNo}</td>
                <td className="p-2">{letter.date}</td>
                <td className="p-2">{letter.subject}</td>
                <td className="p-2">{letter.role}</td>
                <td className="p-2">{letter.name}</td>
                <td className="p-2">{letter.location}</td>
                <td className="p-2">{letter.district}</td>
                <td className="p-2 flex flex-col space-y-1 text-xs">
                  <a
                    href={letter.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View PDF
                  </a>
                  <button
                    onClick={() =>
                      window.open(letter.fileUrl, "_blank")?.print()
                    }
                    className="text-blue-600 hover:underline"
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
