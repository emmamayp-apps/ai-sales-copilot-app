"use client";

import type { Dispatch, SetStateAction } from "react";
import { Copy, RefreshCcw, Sparkles, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type GeneratedResult = {
  subjectLines: string[];
  email: string;
  followUps: string[];
};

type OutputPanelProps = {
  result: GeneratedResult | null;
  setResult: Dispatch<SetStateAction<GeneratedResult | null>>;
  isGenerating: boolean;
  activeAction: "generate" | "regenerate" | "shorter" | "more_professional" | null;
  onRegenerate: () => void;
  onMakeShorter: () => void;
  onMoreProfessional: () => void;
};

export function OutputPanel({
  result,
  setResult,
  isGenerating,
  activeAction,
  onRegenerate,
  onMakeShorter,
  onMoreProfessional,
}: OutputPanelProps) {
  const hasResult = !!result;

  return (
    <Card className="border-white/60 bg-white/75 shadow-xl shadow-violet-100/40 backdrop-blur-sm">
      <CardHeader className="pb-5">
        <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          <Sparkles className="h-3.5 w-3.5" />
          AI Output
        </div>
        <CardTitle className="text-2xl text-slate-900">
          Generated Output
        </CardTitle>
        <CardDescription className="text-sm text-slate-600">
          Your AI-generated email and suggestions will appear here.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {isGenerating ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-blue-50/70 p-8 text-center">
            <div className="mb-4 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              Generating
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              Creating your draft
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              The AI is generating subject lines, an email draft, and follow-up
              ideas.
            </p>
          </div>
        ) : !hasResult ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-blue-50/70 p-8 text-center">
            <div className="mb-4 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              Waiting for input
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              Ready to generate
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Fill in the lead details to create a personalized outbound draft,
              follow-up ideas, and useful talking points.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-sm font-semibold text-slate-700">
                  Subject Lines
                </h3>
                <div className="space-y-2">
                  {result.subjectLines.map((line, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-700"
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-slate-700">
                  Email Draft
                </h3>
                <Textarea
                  value={result.email}
                  onChange={(e) =>
                    setResult({
                      ...result,
                      email: e.target.value,
                    })
                  }
                  className="min-h-[220px] resize-none rounded-xl border-slate-200 bg-white/90"
                />
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-slate-700">
                  Follow-up Ideas
                </h3>
                <div className="space-y-2">
                  {result.followUps.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button
                type="button"
                variant="secondary"
                className="gap-2"
                onClick={() => setResult(null)}
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="gap-2"
                onClick={() =>
                  navigator.clipboard.writeText(
                    [
                      "Subject Lines:",
                      ...result.subjectLines.map((s) => `- ${s}`),
                      "",
                      "Email Draft:",
                      result.email,
                      "",
                      "Follow-up Ideas:",
                      ...result.followUps.map((f) => `- ${f}`),
                    ].join("\n")
                  )
                }
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                disabled={!!activeAction}
                onClick={onRegenerate}
              >
                <RefreshCcw className="h-4 w-4" />
                {activeAction === "regenerate" ? "Regenerating..." : "Regenerate"}
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={!!activeAction}
                onClick={onMakeShorter}
              >
                {activeAction === "shorter" ? "Shortening..." : "Make shorter"}
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={!!activeAction}
                onClick={onMoreProfessional}
              >
                {activeAction === "more_professional"
                  ? "Refining..."
                  : "More professional"}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}