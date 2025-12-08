import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { groq } from "../deep-research/services";
import { z } from "zod";

const clarifyResearch = async (topic: string) => {
    const prompt = `
    Given the research topic <topic>${topic}</topic>, generate 2-4 clarifying questions to help narrow down the research scope. Focus on identifying 
    - Specific aspects of interest 
    - Required depth/complexity level
    - Any particular perspective or excluded sources 
    - Any specific sources or references you want to include or exclude
    `;

    try {
        const { object } = await generateObject({
            model: groq("openai/gpt-oss-120b"),
            prompt: prompt,
            system: "You are a helpful research assistant that generates clarifying questions to help narrow down research topics.",
            schema: z.object({
                questions: z.array(z.string())
            })
        });
        return object;
    } catch (error) {
        console.error("Error generating questions:", error);
        return null;
    }
}

export async function POST(req: Request) {
    const { topic } = await req.json();
    console.log("Generating questions for topic:", topic);

    try {
        const questions = await clarifyResearch(topic);
        console.log("Generated questions:", questions);
        return NextResponse.json(questions);
    } catch (error) {
        console.error("Error in POST handler:", error);
        return NextResponse.json({
            success: false,
            error: "failed to generate questions"
        }, { status: 500 });
    }
}