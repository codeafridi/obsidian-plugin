# 🚀 Obsidian Local AI

A fully local AI assistant plugin for Obsidian.

No API keys.
No cloud.
No subscriptions.
No usage credits.

Everything runs on your machine using Ollama.

# ✨ What This Plugin Does

This plugin allows you to:

Generate AI summaries of your notes

Run AI locally inside Obsidian

Keep all your data private

Avoid external APIs completely

It connects Obsidian to a local LLM served by Ollama.

# 🔒 Why Local AI?

Most AI tools require:

API keys

Cloud connections

Usage billing

Sending your notes to external servers

This plugin runs entirely on:

http://localhost:11434

Your data never leaves your computer.

# 🛠 Requirements

Before using this plugin, you must install:

## 1️⃣ Node.js (for development only)

Download:
https://nodejs.org/

Verify:
```bash
node -v
npm -v
```
## 2️⃣ Ollama

Download:
https://ollama.com/download

After installation, verify:
```bash
ollama --version
```

Ollama runs automatically in background on Windows.

If needed, start it manually:

ollama serve
## 3️⃣ Download a Model

Example lightweight model:
```bash
ollama pull llama3.2:3b

Or:

ollama pull deepseek-coder:6.7b
```

Make sure the model name matches what is set in:

main.ts
const MODEL_NAME = "llama3.2:3b";
### 📦 Installation (Manual)

Open your Obsidian vault folder.

Navigate to:

.obsidian/plugins/

Create a new folder:

obsidian-local-ai

Copy these files into that folder:

manifest.json
main.js
styles.css

Restart Obsidian.

Go to:

Settings → Community Plugins → Enable "Obsidian Local AI"

### ⚙️ How It Works

When you run:
```bash
Summarize Note with Local AI
```
The plugin:

Reads the current note content.

Sends it to:

http://localhost:11434/api/generate

Ollama processes it locally.

The AI response is appended to the bottom of the note in a styled callout block.

### 🧠 Example Output
---
> [!abstract]
> ### AI Summary
> This note explains the rules of French plural nouns...

### 🧩 How to Use
Open a note.

Press:
```bash
Ctrl + P
```

Search:
```bash
Summarize Note with Local AI
```

The AI summary will be appended at the end.

### 🔍 Troubleshooting
Ollama Not Running

If you see connection errors:
```bash
ollama serve
```

If you see:
```bash
bind: Only one usage of each socket address...
```

Ollama is already running.

Model Not Found

Make sure the model exists:

ollama list

If missing:
```bash
ollama pull llama3.2:3b
```
Command Not Appearing

Ensure plugin is enabled

Ensure main.js exists

Restart Obsidian

### 🧪 Development Setup

Clone repo:

git clone <your-repo-url>
cd obsidian-local-ai

Install dependencies:

```bash 
npm install
```

Compile TypeScript:
```bash
npx tsc
```

Copy compiled files into:

.obsidian/plugins/obsidian-local-ai
### 📁 Project Structure
obsidian-local-ai/
├── main.ts
├── main.js
├── manifest.json
├── styles.css
├── package.json
├── tsconfig.json

### 🚀 Roadmap

 Ask before appending summary

 Create new note instead of appending

 AI rewrite command

 Custom prompt support

 Model selector in settings

 Streaming output

 Multi-command support

### 🔐 Privacy

This plugin:

Does not use cloud APIs

Does not store your data

Does not track usage

Sends requests only to localhost

### 🧑‍💻 Author

Built by Mohammed Afridi.