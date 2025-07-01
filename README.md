# 🩺 AI Medical Voice Agent

A web-based conversational assistant designed to help users with medical inquiries using natural voice communication. It combines voice input, generative AI models, secure user authentication, and a serverless database to deliver a seamless and intuitive experience.

---

## 🌟 Features

- 🎤 **Voice Interaction**: Real-time conversations using **Vapi** and **AssemblyAI** for speech-to-text and text-to-speech.
- 🧠 **AI-Powered Responses**: Intelligent answers powered by **Google Generative AI** and **OpenAI**.
- 🗃️ **Serverless Database**: Fast, scalable data storage via **Neon Database** and **Drizzle ORM**.
- 🖥️ **Modern UI**: Built with **Next.js**, **React**, and **Tailwind CSS** for responsive, elegant interfaces.
- 🔐 **Secure Authentication**: Managed with **Clerk** for scalable user auth.
- ⚡ **Real-Time Processing**: Fast API interactions using **Axios**.
- 🧩 **Custom UI Components**: Enhanced with **Radix UI**, **Lucide**, and **Tabler Icons**.

---

## 🧱 Tech Stack

### 🖥️ Frontend

| Tool | Purpose |
|------|---------|
| `next@15.3.4` | React framework for SSR and routing |
| `react@19.0.0` | UI component library |
| `tailwindcss` + `tailwind-merge@3.3.1` | Utility-first CSS & class merging |
| `clsx@2.1.1` / `class-variance-authority@0.7.1` | Class utilities |
| `radix-ui/react-dialog@1.1.14`, `@radix-ui/react-slot@1.2.3` | Accessible component primitives |
| `lucide-react@0.523.0` / `tabler/icons-react@3.34.0` | Icon libraries |
| `motion@12.19.1` | Animations and transitions |

### 🎤 Voice & AI

| Tool | Purpose |
|------|---------|
| `@vapi-ai/web@2.3.8` | Real-time voice assistant SDK |
| `@google/generative-ai@0.24.1` | Google Gemini API |
| `openai@5.7.0` | OpenAI’s GPT models |
| `axios@1.10.0` | HTTP client for APIs |
| `assemblyai` | (via direct API) Speech recognition |

### 🗃️ Database

| Tool | Purpose |
|------|---------|
| `@neondatabase/serverless@1.0.1` | Serverless Postgres |
| `drizzle-orm@0.44.2` | Type-safe ORM |
| `postgres@3.4.7` | Postgres driver for Node.js |

### 🔐 Authentication

| Tool | Purpose |
|------|---------|
| `@clerk/nextjs@6.23.0` | Authentication and session handling |

### 🧰 Utilities

| Tool | Purpose |
|------|---------|
| `uuid@11.1.0` | Unique ID generation |

---

## ⚙️ Prerequisites

- Node.js v18+
- npm or Yarn
- Neon Database account
- API keys for:
  - Vapi
  - AssemblyAI
  - Google Generative AI
  - OpenAI
  - Clerk

---

## 📦 Installation

```bash
git clone https://github.com/your-username/ai-medical-voice-agent.git
cd ai-medical-voice-agent

# Install dependencies
npm install
