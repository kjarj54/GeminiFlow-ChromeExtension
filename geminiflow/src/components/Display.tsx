import { useState } from "react";
import Button from "./Button";

export default function Component() {
  const [errorMessage, setErrorMessage] = useState("");
  const [context, setContext] = useState("");
  const [workflow, setWorkflow] = useState("");
  const [includeLogs, setIncludeLogs] = useState(false);

  const handleSubmit = async () => {

    const tabs = await chrome.tabs.query({});

    const geminiTab = tabs.find(tab => tab.url && tab.url.includes("https://gemini.google.com/app"));

    if (geminiTab) {
        const tabId = geminiTab.id;
        if (typeof tabId === 'number') {
            await chrome.tabs.update(tabId, { active: true });
        }
    } else {
        await chrome.tabs.create({ url: "https://gemini.google.com/app" });
    }

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
        <Button onClick={handleSubmit} text="Submit" />
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
