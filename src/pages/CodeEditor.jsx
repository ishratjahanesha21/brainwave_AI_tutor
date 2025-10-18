import  { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import Section from "../components/Section";

const CodeEditor = ({ language }) => {
  const [code, setCode] = useState(
    language === "python"
      ? "# Write your Python code here"
      : "// Write your C++ code here"
  );
  const [output, setOutput] = useState("");

  const languageMap = {
    python: 71, // Judge0 ID for Python 3
    cpp: 54, // Judge0 ID for C++
  };

  const runCode = async () => {
    setOutput("Running...");
    try {
      const submissionRes = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          language_id: languageMap[language],
          source_code: code,
          stdin: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY", // replace with your key
          },
          params: {
            base64_encoded: "false",
            wait: "true",
          },
        }
      );

      const { stdout, stderr } = submissionRes.data;
      if (stdout) setOutput(stdout);
      else if (stderr) setOutput(stderr);
      else setOutput("No output");
    } catch (err) {
      setOutput("Error running code: " + err.message);
    }
  };

  const askAI = () => {
    alert("AI help coming soon!");
  };

  return (
    <Section>
 <div className="mt-4">
      <Editor
        height="400px"
        defaultLanguage={language === "python" ? "python" : "cpp"}
        defaultValue={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark"
      />
      <div className="flex gap-3 mt-3">
        <button
          onClick={runCode}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Run Code
        </button>
        <button
          onClick={askAI}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          Ask AI
        </button>
      </div>
      <div className="mt-4 p-3 bg-gray-900 text-white rounded-md">
        <h4 className="font-semibold mb-2">Output:</h4>
        <pre>{output}</pre>
      </div>
    </div>
    </Section>
   
  );
};

export default CodeEditor;
