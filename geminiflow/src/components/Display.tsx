import { useState } from "react";

export default function Component() {
  const [errorMessage, setErrorMessage] = useState("");
  const [context, setContext] = useState("");
  const [workflow, setWorkflow] = useState("");
  const [includeLogs, setIncludeLogs] = useState(false);

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", {
      errorMessage,
      context,
      workflow,
      includeLogs,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <select
            className="border border-gray-300 rounded-md p-2 none cursor-not-allowed opacity-50"
            value={workflow}
            onChange={(e) => setWorkflow(e.target.value)}
            disabled
          >
            <option value="gemini">Gemini</option>
            <option value="chatgpt">ChatGPT</option>
          </select>
        </div>
        <div className="w-full">
          <input
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter error message or issue"
            type="text"
            value={errorMessage}
            onChange={(e) => setErrorMessage(e.target.value)}
          />
        </div>
        <textarea
          className="border border-gray-300 rounded-md p-2"
          placeholder="Provide context or steps to reproduce the issue."
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
        <div className="flex flex-col gap-4">
          <select
            className="border border-gray-300 rounded-md p-2"
            value={workflow}
            onChange={(e) => setWorkflow(e.target.value)}
          >
            <option value="">Select workflow</option>
            <option value="debugging">Debugging</option>
            <option value="testing">Testing</option>
            <option value="code-review">Code Review</option>
            <option value="pair-programming">Pair Programming</option>
          </select>
          <label
            className="text-sm font-medium leading-none"
            htmlFor="include-logs"
          >
            <input
              id="include-logs"
              type="checkbox"
              checked={includeLogs}
              onChange={(e) => setIncludeLogs(e.target.checked)}
            />
            Include logs or error output
          </label>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <div className="border rounded-md p-4">
          <p className="font-medium">Gemini Tool Output:</p>
          <div className="mt-4 bg-gray-100 h-32 rounded-md flex items-center justify-center">
            <span className="text-gray-500">
              Output will be displayed here...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
