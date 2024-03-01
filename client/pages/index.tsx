import React, { useState } from "react";

function UserInput() {
  const [numA, setNumA] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [result, setResult] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numA }),
      });

      const data = await response.json();
      setResult(`${data.result}`);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult("Error fetching data");
    }
  };

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPdfFile(file);
  };

  const processPdf = async () => {
    try {
      const formData = new FormData();
      formData.append("pdfFile", pdfFile as Blob);

      const response = await fetch("http://localhost:8080/api/processPdf", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(`Processed PDF result: ${data.result2}`);
    } catch (error) {
      console.error("Error processing PDF:", error);
      setResult("Error processing PDF");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-lg p-8 max-w-md w-full bg-white shadow-md transition duration-300 ease-in-out transform hover:scale-105">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Provide the Text:
            <textarea
              className="resize-none border rounded-md p-20 w-full mt-3"
              value={numA}
              onChange={(e) => setNumA(e.target.value)}
              style={{ resize: "none" }}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload PDF:
            <input
              type="file"
              accept=".pdf"
              onChange={handlePdfFileChange}
              className="border rounded-md p-2 w-full mt-3"
            />
          </label>
        </div>
        <div className="mb-4 flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105"
            onClick={fetchData}
          >
            Check
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105 ml-2"
            onClick={processPdf}
          >
            Process PDF
          </button>
        </div>
        <div className="text-gray-700">{result}</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-1 mt-8">
        AI-generated-Text-Detector
      </h1>
      <UserInput />
    </div>
  );
}

export default App;
