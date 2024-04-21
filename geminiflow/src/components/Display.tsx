import { useState } from "react";
import Button from "./Button";
import ComponentInput from "./ComponentInput";
import SelectInput from "./SelectInput";
import promptsData from "./estructurepromps.json";
import WorkflowSelect from "./WorkflowSelect";

export default function Component() {
  const [errorMessage, setErrorMessage] = useState("");
  const [context, setContext] = useState("");
  const [workflow, setWorkflow] = useState("");
  const [typeia, seTypeia] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [prompts, setPrompts] = useState("");

  const handleSubmit = async () => {
    const tabs = await chrome.tabs.query({});

    if (workflow !== "tool" && workflow !== "reflection") {
      setShowWarning(true);
      return;
    }

    const geminiTab = tabs.find(
      (tab) => tab.url && tab.url.includes("https://gemini.google.com/app")
    );

    if (geminiTab) {
      const tabId = geminiTab.id;
      if (typeof tabId === "number") {
        await chrome.tabs.update(tabId, { active: true });
        setPrompts(modifyPrompt(workflow, errorMessage, context));
        geminiScript(tabId, modifyPrompt(workflow, errorMessage, context));
      }
    } else {
      const newTab = await chrome.tabs.create({
        url: "https://gemini.google.com/app",
        active: false,
      });

      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);
          setPrompts(modifyPrompt(workflow, errorMessage, context));
          geminiScript(newTab.id, modifyPrompt(workflow, errorMessage, context));
          chrome.tabs.update(newTab.id, { active: true });
        }
      });
    }
  };

  const modifyPrompt = (
    workflow: string,
    errorMessage: string,
    context: string
  ) => {
    const selectedWorkflow = promptsData.workflows.find(
      (w) => w.name === workflow
    );

    if (selectedWorkflow) {
      const task = selectedWorkflow.tasks[0];

      let modifiedPrompt = task.promp.replace("{code}", errorMessage);

      if (context.trim() !== "") {
        modifiedPrompt = modifiedPrompt.replace(
          "{context}",
          context + " here you have more information"
        );
      } else {
        modifiedPrompt = modifiedPrompt.replace("{context}", "");
      }
      return modifiedPrompt;
    }
    return "Workflow no encontrado";
  };

  const geminiScript = async (tabId: number, promptText: string) => {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: (msg) => {
        const paragraph = document.querySelector(".ql-editor.textarea p");
        if (paragraph) {
          paragraph.textContent = msg;
        }
      },
      args: [promptText],
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
          <WorkflowSelect value={workflow} onChange={setWorkflow} />
        </div>
        <Button onClick={handleSubmit} text="Submit" />
        {showWarning && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-md shadow-lg">
              <p className="text-red-500">
                Workflow must be "tool" or "reflection".
              </p>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => setShowWarning(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
        <div className="border rounded-md p-4">
          <p className="font-medium">Gemini Tool Output: </p>
          <div className="mt-4 bg-gray-100 h-32 rounded-md flex items-center justify-center">
            <span className="text-gray-500 max-w-full overflow-hidden overflow-ellipsis">
              <p className="font-medium from-neutral-50 rounded-md p-2">{prompts}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
