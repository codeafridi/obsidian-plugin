"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const obsidian_1 = require("obsidian");
const MODEL_NAME = "llama3.2:3b";
class LocalAIPlugin extends obsidian_1.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addCommand({
                id: "summarize-note",
                name: "Summarize Note with Local AI",
                editorCallback: (editor) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    new obsidian_1.Notice("Generating summary...");
                    const noteContent = editor.getValue();
                    const controller = new AbortController();
                    const timeoutId = window.setTimeout(() => controller.abort(), 30000);
                    try {
                        const response = yield fetch("http://localhost:11434/api/generate", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                model: MODEL_NAME,
                                prompt: "Provide a concise, high-level summary (3–6 bullet points) of the following Obsidian note:\n\n" +
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
                            new obsidian_1.Notice(`Local AI error: ${response.statusText}`);
                            return;
                        }
                        const data = yield response.json();
                        const result = (_a = data.response) !== null && _a !== void 0 ? _a : "";
                        if (!result.trim()) {
                            new obsidian_1.Notice("Local AI returned an empty summary.");
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
                        new obsidian_1.Notice("Summary added.");
                    }
                    catch (error) {
                        window.clearTimeout(timeoutId);
                        new obsidian_1.Notice("Failed to contact Local AI. Is Ollama running?");
                        console.error("Local AI plugin error:", error);
                    }
                })
            });
        });
    }
}
exports.default = LocalAIPlugin;
