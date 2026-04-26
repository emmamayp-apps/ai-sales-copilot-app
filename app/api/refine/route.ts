import { leadFormSchema } from "@/lib/schema";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const refineSchema = z.object({
  currentEmail: z.string().min(1),
  action: z.enum(["regenerate", "shorter", "more_professional"]),
  lead: leadFormSchema,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = refineSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { currentEmail, action, lead } = parsed.data;

    const actionInstruction = {
      regenerate:
        "Create a fresh alternative version. Keep it personalized and concise.",
      shorter:
        "Rewrite the email to be shorter and punchier while preserving the core message.",
      more_professional:
        "Rewrite the email to sound more professional and polished without becoming stiff.",
    }[action];

    const prompt = `
You are an expert B2B sales assistant.

Return ONLY valid JSON in this exact format:
{
  "subjectLines": ["", ""],
  "email": "",
  "followUps": ["", ""]
}

Lead details:
Company: ${lead.company}
Role: ${lead.role}
Contact Name: ${lead.contactName || "N/A"}
Context: ${lead.context}
Product / Value Proposition: ${lead.valueProp}
Tone: ${lead.tone}

Current email:
${currentEmail}

Instruction:
${actionInstruction}

Rules:
- No markdown
- No extra text outside JSON
- Keep the email concise
- Make the output feel specific to the lead
`;

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      input: prompt,
    });

    const text = response.output_text;

    try {
      return NextResponse.json(JSON.parse(text));
    } catch {
      console.error("Failed to parse refine JSON:", text);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}