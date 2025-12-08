import { createUIMessageStream, createUIMessageStreamResponse } from "ai";
import { ResearchState } from "./types";
import { deepResearch } from "./main";

export async function POST(req: Request) {
    try {
        console.log("📨 POST request received at /api/deep-research");
        const { messages } = await req.json();
        console.log("📥 Messages received:", messages?.length || 0);

        const lastMessageContent = messages[messages.length - 1].content;
        console.log("📝 Last message content:", lastMessageContent);

        const parsed = JSON.parse(lastMessageContent);
        console.log("✅ Parsed:", parsed);

        const topic = parsed.topic;
        const clarifications = parsed.clarifications || parsed.clerifications || [];
        console.log("🎯 Topic:", topic);
        console.log("📋 Clarifications:", clarifications);


        const stream = createUIMessageStream({
            execute: async (dataStream) => {
                console.log("🌊 Stream execution started");
                // Write data
                //   dataStream.writeData({ value: 'Hello' });

                const researchState: ResearchState = {
                    topic: topic,
                    completedSteps: 0,
                    tokenUsed: 0,
                    findings: [],
                    processedUrl: new Set(),
                    clarificationsText: JSON.stringify(clarifications)
                }
                console.log("🔬 Calling deepResearch with state:", researchState.topic);
                await deepResearch(researchState, dataStream)


            },
            // onError: error => `Custom error: ${error.message}`,
        });

        return createUIMessageStreamResponse({ stream });
    } catch (error) {

        return new Response(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Invalid message format!"
            }),
            { status: 200 }
        );

    }
}