import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { z } from "zod";

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});

const clarfiyResearch = async (topic: string) => {
    const prompt = `
    Given the research topic <topic>${topic}</topic>, generate 2-4 clarifying questions to help narrow down the research scope. Focus on identifying 
    - Specific aspects of interest 
    - Required depth/complexity level
    - Any particular perspective or excluded sources 
    - Any specific sources or references you want to include or exclude
    `
    try {
        const { object } = await generateObject({
            model: openrouter("openai/gpt-oss-20b:free"),
            prompt: prompt,
            schema: z.object({
                questions: z.array(z.string())
            })
        });
        return object;
    } catch (error) {
        console.log(error);
    }
}
export async function POST(req: Request) {
    const { topic } = await req.json();
    console.log(topic);

    try {
        const questions = await clarfiyResearch(topic);
        console.log(questions);
        return NextResponse.json(questions);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error: "failed to generate questions"
        }, { status: 500 });
    }
}   