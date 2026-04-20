import { NextResponse } from "next/server";
import OpenAI from "openai";
import { leadFormSchema } from "@/lib/schema";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        //Validate input
        const parsed = leadFormSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({error: "Invalid input"}, {status: 400});
        }

        const { company, role, contactName, context, valueProp, tone } = parsed.data;

        const prompt = `
        You are an expert B2B sales assistant.

        Write a high-quality outbound cold email using the following details:

        Company: ${company}
        Role: ${role}
        Contact Name: ${contactName || "N/A"}
        Context: ${context}
        Product / Value Proposition: ${valueProp}
        Tone: ${tone}

        Return:
        1. Two subject lines
        2. A short personalized email
        3. Two follow-up suggestions

        Keep it concise, relevant, and not generic.
        `;

        const response = await client.responses.create({
            model: "gpt-5.4-mini",
            input: prompt,
        });

        const text = response.output_text;

        return NextResponse.json({ result: text });

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Something went wrong - Internal server error"}, {status: 500});
    }
}