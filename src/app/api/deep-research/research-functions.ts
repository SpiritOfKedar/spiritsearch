import { ResearchState } from "./types";
import { generateObject } from "ai";
import { openRouter } from "./services"
import { z } from "zod";
import { callModel } from "./model-calller";
import { getPlanningPrompt, PLANNING_SYSTEM_PROMPT } from "./prompts";

export async function generateSearchQueries(researchState: ResearchState) {
    const result = await callModel({
        model: "openai/gpt-oss-20b:free",
        prompt: getPlanningPrompt(researchState.topic, researchState.clarificationText),
        system: PLANNING_SYSTEM_PROMPT,
        schema: z.object({
            searchQueries: z.array(z.string()).describe("The search queries that can be used to find the most relevant content which can be used to write the comprehensive report on the given topic, (max 3 queries)")
        })
    }, researchState)

    return result;
}
