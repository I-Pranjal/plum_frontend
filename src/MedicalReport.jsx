import React, { useState } from 'react';
import { Upload, FileText, Activity, Type } from 'lucide-react';

// ✅ Backend URL
const API_URL = "http://localhost:5000/analyze-report"; 

// Upload Options Component
const UploadOptions = ({ onSubmit, isLoading }) => {
  const [activeTab, setActiveTab] = useState("file");
  const [textInput, setTextInput] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) onSubmit({ file, text: "" });
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) onSubmit({ text: textInput, file: null });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("file")}
          className={`px-6 py-3 text-sm font-medium border-b-2 ${
            activeTab === "file" ? "border-blue-500 text-blue-600" : "text-gray-500"
          }`}
        >
          <Upload className="h-4 w-4 mr-2 inline" />
          Upload File
        </button>
        <button
          onClick={() => setActiveTab("text")}
          className={`px-6 py-3 text-sm font-medium border-b-2 ${
            activeTab === "text" ? "border-blue-500 text-blue-600" : "text-gray-500"
          }`}
        >
          <Type className="h-4 w-4 mr-2 inline" />
          Paste Text
        </button>
      </div>

      {/* File Upload */}
      {activeTab === "file" && (
        <div className="p-6 border-2 border-dashed rounded-lg text-center">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.txt"
            onChange={handleFileSelect}
            disabled={isLoading}
          />
        </div>
      )}

      {/* Text Input */}
      {activeTab === "text" && (
        <div>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Paste your medical report here..."
            className="w-full h-40 p-3 border rounded-md"
          />
          <button
            onClick={handleTextSubmit}
            disabled={isLoading || !textInput.trim()}
            className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-md"
          >
            {isLoading ? "Processing..." : "Analyze Report"}
          </button>
        </div>
      )}
    </div>
  );
};

// Main Component
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
      if (data.status === "ok") setCurrentReport(data);
      else setError("Failed to analyze report.");
    } catch (err) {
      console.error(err);
      setError("Error connecting to server.");
    } finally {
      setIsLoading(false);
    }
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
  <div className="mt-6 space-y-6">
    <h3 className="text-lg font-semibold mb-3">Simplified Summary</h3>
    {Object.entries(currentReport.summary.summary).map(([section, sectionData]) => (
      <div key={section} className="bg-white rounded-xl shadow p-4 mb-6">
        <h4 className="text-md font-bold capitalize mb-2">
          {section.replace(/_/g, " ")}
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-3 py-2 border-b">Test</th>
                <th className="text-left px-3 py-2 border-b">Result</th>
                <th className="text-left px-3 py-2 border-b">Explanation</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(sectionData.details).map(([test, result], idx) => (
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
                  <td className="px-3 py-2 border-b text-gray-700">
                    {currentReport.summary.explanations[idx] || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ))}
  </div>
)}
      </main>
    </div>
  );
};

export default MedicalReportApp;
