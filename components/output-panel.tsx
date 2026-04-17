"use client";

import type { Dispatch, SetStateAction } from "react";
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
  const hasResult = result && result.trim().length > 0;

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Generated Output</CardTitle>
        <CardDescription>
          Your AI-generated email and suggestions will appear here.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {!hasResult ? (
          <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
            No output yet. Fill in the form and click generate.
          </div>
        ) : (
          <>
            <Textarea
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="min-h-[360px] resize-none"
            />

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setResult("")}
              >
                Clear
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  navigator.clipboard.writeText(result)
                }
              >
                Copy
              </Button>

              <Button type="button" variant="outline" disabled>
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