import { ResearchState } from "./types";
import { generateSearchQueries } from "./research-functions";


export async function deepResearchMain(researchState: ResearchState, dataStream: any) {
    const initialQueries = await generateSearchQueries(researchState);
    console.log(initialQueries);
    return initialQueries;
}