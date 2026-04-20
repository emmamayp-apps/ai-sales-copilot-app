"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { OutputPanel } from "@/components/output-panel";
import type { LeadFormValues } from "@/lib/schema";

export default function Home() {
  const [result, setResult] = useState("");

  const handleGenerate = async (values: LeadFormValues) => {
    try {
      setResult("Generating...");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate");
      }

      setResult(data.result);
    } catch (err) {
      console.error(err);
      setResult("Error generating email. Please try again");
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_28%),linear-gradient(to_bottom,_#f8fbff,_#eef4ff)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-violet-600" />
            Portfolio Project
          </div>

          <div className="mt-4 max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              AI Sales Copilot
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Generate personalized outbound emails, follow-up ideas, and
              lead-specific messaging from a few simple inputs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <LeadForm onGenerate={handleGenerate} />
          <OutputPanel result={result} setResult={setResult} />
        </div>
      </div>
    </main>
  );
}