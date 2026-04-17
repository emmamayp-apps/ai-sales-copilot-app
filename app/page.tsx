"use client";

import { useState } from "react";
import { LeadForm } from "@/components/lead-form";
import { OutputPanel } from "@/components/output-panel";
import type { LeadFormValues } from "@/lib/schemas";

export default function Home() {
  const [result, setResult] = useState("");

  const handleGenerate = (values: LeadFormValues) => {
    setResult(
      `Company: ${values.company}
Role: ${values.role}
Contact: ${values.contactName || "N/A"}
Tone: ${values.tone}

Context:
${values.context}

Value Prop:
${values.valueProp}`
    );
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500">Portfolio Project</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            AI Sales Copilot
          </h1>
          <p className="max-w-2xl text-slate-600">
            Generate personalized outbound emails, follow-up ideas, and lead-specific
            messaging from a few simple inputs.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <LeadForm onGenerate={handleGenerate} />
          <OutputPanel result={result} setResult={setResult} />
        </div>
      </div>
    </main>
  );
}