import { parse } from "path";
import { createUIMessageStreamResponse, createUIMessageStream } from "ai";
import { deepResearchMain } from "./main";
import { ResearchState } from "./types";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Received request body:", JSON.stringify(body, null, 2));

        // In AI SDK v2, messages have a 'parts' array structure
        const { messages } = body;

        if (!messages || messages.length === 0) {
            console.error("No messages received");
            return new Response(JSON.stringify({
                success: false,
                error: "No messages provided"
            }), { status: 400 });
        }

        const lastMessage = messages[messages.length - 1];
        console.log("Last message:", JSON.stringify(lastMessage, null, 2));

        // Extract text from the parts array
        let messageText = "";
        if (lastMessage.parts && Array.isArray(lastMessage.parts)) {
            const textPart = lastMessage.parts.find((part: any) => part.type === "text");
            if (textPart) {
                messageText = textPart.text;
            }
        } else if (lastMessage.content) {
            // Fallback for older format
            messageText = lastMessage.content;
        }

        console.log("Extracted message text:", messageText);

        // Parse the JSON content
        const parsed = JSON.parse(messageText);
        console.log("Parsed object:", JSON.stringify(parsed, null, 2));
        const clarifications = parsed.clarifications;
        const topic = parsed.topic;


        // TODO: Process the parsed data (topic and clarifications)
        // For now, just return success
        // Create a streaming response using AI SDK v5
        return createUIMessageStreamResponse({
            stream: createUIMessageStream({
                execute: async ({ writer }) => {
                    const researchState: ResearchState = {
                        topic: topic,
                        completedSteps: 0,
                        tokenUsed: 0,
                        findings: [],
                        processedUrls: new Set(),
                        clarificationText: JSON.stringify(clarifications)
                    }
                    await deepResearchMain(researchState, writer);
                }
            })
        })

    } catch (error) {
        console.error("Error in /api/deep-research:", error);
        return new Response(JSON.stringify({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}