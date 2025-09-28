import React, { useState } from "react";
import { Upload, Type } from "lucide-react";

const UploadOptions = ({ onSubmit, isLoading }) => {
  const [activeTab, setActiveTab] = useState("file");
  const [textInput, setTextInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleAnalyze = () => {
    if (activeTab === "file" && selectedFile) {
      onSubmit({ file: selectedFile, text: "" });
    } else if (activeTab === "text" && textInput.trim()) {
      onSubmit({ text: textInput, file: null });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("file")}
          className={`px-6 py-3 text-sm font-medium border-b-2 ${
            activeTab === "file"
              ? "border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          <Upload className="h-4 w-4 mr-2 inline" />
          Upload File
        </button>
        <button
          onClick={() => setActiveTab("text")}
          className={`px-6 py-3 text-sm font-medium border-b-2 ${
            activeTab === "text"
              ? "border-blue-500 text-blue-600"
              : "text-gray-500"
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
          {selectedFile && (
            <p className="mt-2 text-sm text-gray-600">{selectedFile.name}</p>
          )}
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
        </div>
      )}

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={isLoading || (activeTab === "file" && !selectedFile) || (activeTab === "text" && !textInput.trim())}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md"
      >
        {isLoading ? "Processing..." : "Analyze Report"}
      </button>
    </div>
  );
};

export default UploadOptions;
