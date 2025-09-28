// SummaryWrapper.jsx
import React from "react";
import SummarySection from "./SummarySection";

const SummaryWrapper = ({ summary }) => {
  if (!summary) return null;

  return (
    <div>
      {/* Overall summary */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-700">{summary.summary}</p>
      </div>

      {/* Render each section in details */}
      {summary.details &&
        Object.entries(summary.details).map(([sectionName, sectionData]) => (
          <SummarySection
            key={sectionName}
            section={sectionName}
            sectionData={sectionData}
          />
        ))}

      {/* Explanations */}
      {summary.explanations && summary.explanations.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <h4 className="font-bold mb-2">Explanations:</h4>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {summary.explanations.map((exp, idx) => (
              <li key={idx}>{exp}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SummaryWrapper;
