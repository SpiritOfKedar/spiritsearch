"use client"
import React, { useEffect } from "react"
import { useUIMessageStream } from 'ai';
import { useDeepResearchStore } from "@/store/deepResearch"
import QuestionForm from "./QuestionForm"

export const QnA = () => {
    const { questions, isCompleted, topic, answers, setIsLoading } = useDeepResearchStore();

    useEffect(() => {
        if (isCompleted && questions.length > 0) {
            const clarifications = questions.map((question, index) => ({
                question: question,
                answer: answers[index]
            }));

            // Create the message content
            const messageContent = JSON.stringify({
                topic: topic,
                clarifications: clarifications
            });

            console.log("📤 Sending deep research request:", messageContent);
            setIsLoading(true);

            // Make direct fetch call to the API
            fetch("/api/deep-research", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "user",
                            content: messageContent
                        }
                    ]
                })
            })
                .then(response => {
                    console.log("✅ Research request sent successfully");
                    // Handle streaming response here
                    return response.body;
                })
                .catch(error => {
                    console.error("❌ Error sending research request:", error);
                    setIsLoading(false);
                });
        }
    }, [isCompleted, questions, answers, topic, setIsLoading]);

    return (
        <div className="flex gap-4 w-full flex-col items-center justify-center mb-16">
            <QuestionForm />
        </div>
    )
}