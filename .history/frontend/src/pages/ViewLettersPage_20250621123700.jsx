import React from "react";

const sampleData = [
  {
    letterNo: "DRDO/001",
    date: "2025-06-21",
    subject: "Test Subject",
    role: "Sender",
    name: "Dr. A. Sharma",
    location: "Delhi HQ",
    district: "New Delhi",
    fileUrl: "path/to/sample.pdf", // Replace with actual file path
  },
];

const ViewLetters = () => {
  const handlePrint = (fileUrl) => {
    const printWindow = window.open(fileUrl, "_blank");
    if (printWindow) {
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#003366] flex items-center justify-center px-2 py-8">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-6xl">
        <h1 className="text-xl font-bold text-[#003366] mb-4 text-center">
          View Uploaded Letters
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-[#002244] text-white">
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
              {sampleData.map((letter, index) => (
                <tr key={index} className="bg-white text-center">
                  <td className="p-2">{letter.letterNo}</td>
                  <td className="p-2">{letter.date}</td>
                  <td className="p-2">{letter.subject}</td>
                  <td className="p-2">{letter.role}</td>
                  <td className="p-2">{letter.name}</td>
                  <td className="p-2">{letter.location}</td>
                  <td className="p-2">{letter.district}</td>
                  <td className="p-2 text-blue-600 space-y-1">
                    <div>
                      <a
                        href={letter.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline block"
                      >
                        View PDF
                      </a>
                    </div>
                    <div>
                      <button
                        onClick={() => handlePrint(letter.fileUrl)}
                        className="hover:underline text-left block"
                      >
                        Print
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewLetters;
