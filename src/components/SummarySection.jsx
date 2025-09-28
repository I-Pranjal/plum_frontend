// SummarySection.jsx
import React from "react";

const SummarySection = ({ section, sectionData }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      {/* Section Header */}
      <h4 className="text-md font-bold capitalize mb-2">
        {section.replace(/_/g, " ")}
      </h4>

      {/* Section Summary (optional if you want a per-section summary) */}
      {sectionData.summary && (
        <p className="text-sm text-gray-600 mb-3">{sectionData.summary}</p>
      )}

      {/* Details Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-3 py-2 border-b">Test</th>
              <th className="text-left px-3 py-2 border-b">Result</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(sectionData).map(([test, result]) => (
              <tr key={test} className="hover:bg-gray-50">
                <td className="px-3 py-2 border-b capitalize">
                  {test.replace(/_/g, " ")}
                </td>
                <td
                  className={`px-3 py-2 border-b font-medium ${
                    result.toLowerCase() === "normal"
                      ? "text-green-600"
                      : result.toLowerCase().includes("low")
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  {result}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummarySection;
