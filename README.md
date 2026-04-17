# AI Sales Copilot

A lightweight AI-powered tool that helps generate personalized outbound sales emails based on lead and company context.

## 🚀 Overview

AI Sales Copilot allows users to input basic information about a prospect and instantly generate:

* Cold outreach emails
* Subject line ideas
* Personalization suggestions
* Follow-up messages

The goal is to simulate a real-world AI product used by SDRs and account executives to improve outbound efficiency.

---

## 🧠 Features

* Generate AI-powered sales emails
* Multiple subject line suggestions
* Personalization insights based on context
* Follow-up message ideas
* Editable output (users can tweak AI results)
* Tone adjustments (e.g. professional, concise)

---

## 🛠 Tech Stack

* **Frontend:** Next.js (App Router), React, TypeScript
* **Styling:** Tailwind CSS
* **Forms & Validation:** React Hook Form, Zod
* **AI Integration:** OpenAI API
* **Deployment:** Netlify
* **Version Control:** GitHub

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/ai-sales-copilot-v2.git
cd ai-sales-copilot-v2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```bash
OPENAI_API_KEY=your_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## 🧩 How It Works

1. User inputs company and lead details
2. Frontend sends request to a server-side API route
3. Server calls OpenAI API securely
4. AI generates structured output:

   * Subject lines
   * Email draft
   * Personalization ideas
   * Follow-ups
5. Results are displayed and editable in the UI

---

## 📌 Project Goals

* Build a realistic AI-powered frontend application
* Demonstrate integration with LLM APIs
* Showcase modern React + TypeScript architecture
* Create a strong portfolio project aligned with real-world use cases

---

## 🔮 Future Improvements

* Save generated emails (database integration)
* User authentication
* Prompt templates for different personas
* CRM-style lead tracking
* Copy/export functionality
* Analytics on generated outputs

---

## ⚠️ Notes

* This project uses the OpenAI API and may incur small usage costs
* API keys are stored securely in environment variables (never exposed to the client)

---

## 📄 License

This project is for educational and portfolio purposes.



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
