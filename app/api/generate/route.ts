import { NextResponse } from "next/server";
import OpenAI from "openai";
import { leadFormSchema } from "@/lib/schema";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = leadFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { company, role, contactName, context, valueProp, tone } = parsed.data;

    const prompt = `
You are an expert B2B sales assistant.

Return ONLY valid JSON in this exact format:
{
  "subjectLines": ["", ""],
  "email": "",
  "followUps": ["", ""]
}

Write a high-quality outbound cold email using these details:

Company: ${company}
Role: ${role}
Contact Name: ${contactName || "N/A"}
Context: ${context}
Product / Value Proposition: ${valueProp}
Tone: ${tone}

Rules:
- Keep it concise
- Avoid generic phrases
- Make it feel personalized
- No markdown
- No extra text outside JSON
`;

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      input: prompt,
    });

    const text = response.output_text;

    let parsedOutput: {
      subjectLines: string[];
      email: string;
      followUps: string[];
    };

    try {
      parsedOutput = JSON.parse(text);
    } catch (error) {
      console.error("Failed to parse model JSON:", text);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    return NextResponse.json(parsedOutput);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}