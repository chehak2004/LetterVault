import React, { useEffect, useRef, useState } from "react";

const ViewLetters = () => {
  const [letters, setLetters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editData, setEditData] = useState(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/letters")
      .then((res) => res.json())
      .then((data) => setLetters(data))
      .catch((err) => console.error("Error fetching letters:", err));
  }, []);

  const handlePrint = (fileUrl) => {
    const iframe = iframeRef.current;
    iframe.src = fileUrl;
    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }, 200);
    };
  };

  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileUrl.split("/").pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = (letter) => {
    setEditData({ ...letter });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/letters/${editData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const updated = await response.json();
        setLetters((prevLetters) =>
          prevLetters.map((letter) =>
            letter.id === updated.id ? updated : letter
          )
        );
        setEditData(null);
      } else {
        console.error("Failed to update letter");
      }
    } catch (error) {
      console.error("Error updating letter:", error);
    }
  };

  const filteredLetters = letters.filter((letter) =>
    Object.values(letter).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="w-screen min-h-screen bg-[#003366] py-10 px-4 flex justify-center items-start">
      <div className="bg-white rounded-lg p-6 w-full max-w-7xl shadow-lg overflow-x-auto">
        <h1 className="text-xl font-bold text-[#003366] mb-4 text-center">
          View Uploaded Letters
        </h1>

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
              <th className="px-3 py-2">DO/Letter No</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Subject</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Location</th>
              <th className="px-3 py-2">District</th>
              <th className="px-6 py-3">View</th>
              <th className="px-6 py-3">Print</th>
              <th className="px-3 py-2">Download</th>
              <th className="px-3 py-2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredLetters.map((letter, index) => (
              <tr key={index} className="bg-white border-t text-center">
                <td className="px-3 py-2 text-left">{letter.letterNo}</td>
                <td className="px-3 py-2 text-left">{letter.date}</td>
                <td className="px-3 py-2 text-left">{letter.subject}</td>
                <td className="px-3 py-2 text-left">{letter.role}</td>
                <td className="px-3 py-2 text-left">{letter.name}</td>
                <td className="px-3 py-2 text-left">{letter.location}</td>
                <td className="px-3 py-2 text-left">{letter.district}</td>
                <td className="px-3 py-2 text-left text-blue-600">
                  <a
                    href={letter.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline ml-3"
                  >
                    View
                  </a>
                </td>
                <td className="px-3 py-2 text-left ml-">
                  <button
                    onClick={() => handlePrint(letter.fileUrl)}
                    className="text-blue-600 hover:underline"
                  >
                    Print
                  </button>
                </td>
                <td className="px-3 py-2 text-left">
                  <button
                    onClick={() => handleDownload(letter.fileUrl)}
                    className="text-blue-600 hover:underline"
                  >
                    Download
                  </button>
                </td>
                <td className="px-3 py-2 text-left">
                  <button
                    onClick={() => handleEdit(letter)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {filteredLetters.length === 0 && (
              <tr>
                <td colSpan="11" className="text-center py-4 text-gray-500">
                  No matching letters found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Edit Form */}
        {editData && (
          <div className="mt-6 bg-gray-100 p-4 rounded text-sm">
            <h2 className="text-md font-semibold mb-2 text-[#003366]">
              Edit Letter: {editData.letterNo}
            </h2>

            {[
              "letterNo",
              "date",
              "subject",
              "role",
              "name",
              "location",
              "district",
              "fileUrl",
            ].map((field) => (
              <div className="mb-2" key={field}>
                <label className="block text-sm font-medium capitalize">
                  {field === "fileUrl" ? "PDF URL" : field}
                </label>
                <input
                  type={field === "date" ? "date" : "text"}
                  value={editData[field]}
                  onChange={(e) =>
                    setEditData({ ...editData, [field]: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
            ))}

            <button
              onClick={handleEditSubmit}
              className="bg-[#003366] text-white px-4 py-2 mt-2 rounded"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Hidden iframe for print */}
      <iframe ref={iframeRef} style={{ display: "none" }} title="print-frame" />
    </div>
  );
};

export default ViewLetters;
