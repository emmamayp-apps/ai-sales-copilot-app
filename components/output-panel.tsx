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

type OutputPanelProps = {
  result: string;
  setResult: Dispatch<SetStateAction<string>>;
};

export function OutputPanel({ result, setResult }: OutputPanelProps) {
  const hasResult = result.trim().length > 0;

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
        {!hasResult ? (
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
            <Textarea
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="min-h-[420px] resize-none rounded-xl border-slate-200 bg-white/90"
            />

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button
                type="button"
                variant="secondary"
                className="gap-2"
                onClick={() => setResult("")}
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="gap-2"
                onClick={() => navigator.clipboard.writeText(result)}
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>

              <Button type="button" variant="outline" className="gap-2" disabled>
                <RefreshCcw className="h-4 w-4" />
                Regenerate
              </Button>

              <Button type="button" variant="outline" disabled>
                Make shorter
              </Button>

              <Button type="button" variant="outline" disabled>
                More professional
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}