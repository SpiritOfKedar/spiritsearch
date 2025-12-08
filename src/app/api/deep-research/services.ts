import { createGroq } from '@ai-sdk/groq';
import Exa from "exa-js"

export const exa = new Exa(process.env.EXA_AI_API || "");

export const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY || "",
});