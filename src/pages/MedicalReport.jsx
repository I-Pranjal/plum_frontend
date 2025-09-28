import React, { useState } from "react";
import { Activity } from "lucide-react";
import { API_URL } from "../config";
import UploadOptions from "../components/UploadOptions";
import ReportSummary from "../components/ReportSummary";

const MedicalReportApp = () => {
  const [currentReport, setCurrentReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async ({ text, file }) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      if (text) formData.append("text_input", text);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response from server:", data);
      if (data.status === "ok") {
        setCurrentReport(data);
      } else {
        setError("Failed to analyze report.");
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentReport(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <Activity className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold">MedReport Simplifier</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        {!currentReport && (
          <UploadOptions onSubmit={handleSubmit} isLoading={isLoading} />
        )}

        {isLoading && <p className="mt-6 text-blue-600">Processing...</p>}
        {error && <p className="mt-6 text-red-600">{error}</p>}

        {currentReport && (
          <>
            <ReportSummary summary={currentReport.summary} />
            <div className="mt-6">
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-gray-700 text-white rounded-md"
              >
                Upload Another Report
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default MedicalReportApp;
