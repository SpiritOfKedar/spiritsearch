import { ModelCallOptions, ResearchState } from "./types";
import { openRouter } from "./services";
import { z } from "zod";
import { generateObject } from "ai"

export async function callModel<T>({
    model, prompt, system, schema
}: ModelCallOptions<T>, researchState: ResearchState): Promise<T | string> {
    const { object, usage } = await generateObject({
        model: openRouter(model),
        prompt,
        system,
        schema,
    });
    researchState.tokenUsed += usage.totalTokens ?? 0;
    researchState.completedSteps++;
    return object;
} 