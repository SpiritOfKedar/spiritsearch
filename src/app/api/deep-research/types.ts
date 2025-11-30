import z from "zod";

export interface ResearchFindings {
    summary: string,
    source: string,

}
export interface ResearchState {
    topic: string;
    completedSteps: number;
    tokenUsed: number;
    findings: ResearchFindings[];
    processedUrls: Set<string>;
    clarificationText: string;
}

export interface ModelCallOptions<T> {
    model: string,
    prompt: string,
    system: string,
    schema: z.ZodType<T>
}