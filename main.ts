import { Plugin, Editor, Notice } from "obsidian";

const MODEL_NAME = "llama3.2:3b";

export default class LocalAIPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "summarize-note",
      name: "Summarize Note with Local AI",
      editorCallback: async (editor: Editor) => {
        new Notice("Generating summary...");

        const noteContent = editor.getValue();

        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 30000);

        try {
          const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: MODEL_NAME,
              prompt:
                "Provide a concise, high-level summary (3–6 bullet points) of the following Obsidian note:\n\n" +
                noteContent,
              stream: false,
              options: {
                num_predict: 256,
                temperature: 0.3
              }
            }),
            signal: controller.signal
          });

          window.clearTimeout(timeoutId);

          if (!response.ok) {
            new Notice(`Local AI error: ${response.statusText}`);
            return;
          }

          const data = await response.json();
          const result: string = data.response ?? "";

          if (!result.trim()) {
            new Notice("Local AI returned an empty summary.");
            return;
          }

          const currentContent = editor.getValue();
          const formattedResult = result.replace(/\n/g, "\n> ");

          const aiBlock = `

---
> [!AI-SUMMARY]
> ${formattedResult}

`;

          editor.setValue(currentContent + aiBlock);

          new Notice("Summary added.");
        } catch (error) {
          window.clearTimeout(timeoutId);
          new Notice("Failed to contact Local AI. Is Ollama running?");
          console.error("Local AI plugin error:", error);
        }
      }
    });
  }
}