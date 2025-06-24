import React, { useEffect, useState } from "react";

const ViewLetters = () => {
  const [letters, setLetters] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/letters")
      .then((res) => res.json())
      .then((data) => setLetters(data))
      .catch((err) => console.error("Error fetching letters:", err));
  }, []);

  const filteredLetters = letters.filter(
    (letter) =>
      letter.letterNo.toLowerCase().includes(search.toLowerCase()) ||
      letter.name.toLowerCase().includes(search.toLowerCase()) ||
      letter.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handlePrint = (url) => {
    const win = window.open(url, "_blank");
    if (win) {
      win.focus();
      win.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#003366] px-4 py-6">
      <h2 className="text-center text-white text-xl font-semibold mb-6">
        View Uploaded Letters
      </h2>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by Letter No, Name, or Subject"
          className="w-full max-w-md p-2 rounded text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow text-xs text-center">
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-4 text-gray-500">
                  No letters found.
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
