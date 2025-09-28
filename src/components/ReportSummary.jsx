import React from "react";
import SummarySection from "./SummarySection";

const ReportSummary = ({ summary }) => {
  return (
    <div className="mt-6 space-y-6">
      <h3 className="text-lg font-semibold mb-3">Simplified Summary</h3>
      {Object.entries(summary).map(([section, sectionData]) => (
        <SummarySection
          key={section}
          section={section}
          sectionData={sectionData}
        />
      ))}
    </div>
  );
};

export default ReportSummary;
