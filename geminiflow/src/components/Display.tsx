import { useState } from "react";
import Button from "./Button";
import ComponentInput from "./ComponentInput";
import SelectInput from "./SelectInput";
import WorkflowSelect from "./WorkflowSelect";

export default function Component() {
  const [errorMessage, setErrorMessage] = useState("");
  const [context, setContext] = useState("");
  const [workflow, setWorkflow] = useState("");
  const [typeia, seTypeia] = useState("");
  const [includeLogs, setIncludeLogs] = useState(false);

  const handleSubmit = async () => {
    const tabs = await chrome.tabs.query({});

    const geminiTab = tabs.find(
      (tab) => tab.url && tab.url.includes("https://gemini.google.com/app")
    );

    if (geminiTab) {
      const tabId = geminiTab.id;
      if (typeof tabId === "number") {
        await chrome.tabs.update(tabId, { active: true });
        geminiScript(tabId);
      }
    } else {
      const newTab = await chrome.tabs.create({
        url: "https://gemini.google.com/app",
        active: false,
      });

      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);
          geminiScript(newTab.id || 0);
          chrome.tabs.update(newTab.id, { active: true });
        }
      });
    }
  };

  const geminiScript = async (tabId: number) => {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: (msg) => {
        const paragraph = document.querySelector(".ql-editor.textarea p");
        if (paragraph) {
          paragraph.textContent = msg;
        }
      },
      args: [errorMessage],
    });

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        const sendButton = document.querySelector(
          ".send-button"
        ) as HTMLButtonElement;
        if (sendButton) {
          sendButton.click();
        }
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <SelectInput value={typeia} onChange={seTypeia} />
        </div>
        <div className="w-full">
          <ComponentInput
            placeholder="Enter error message or issue"
            value={errorMessage}
            onChange={setErrorMessage}
          />
        </div>
        <textarea
          className="border border-gray-300 rounded-md p-2"
          placeholder="Provide context or steps to reproduce the issue."
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
        <div className="flex flex-col gap-4">
          <WorkflowSelect
            value={workflow}
            onChange={setWorkflow}
            includeLogs={includeLogs}
            onIncludeLogsChange={setIncludeLogs}
          />
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
