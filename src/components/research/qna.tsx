"use client"
import React, { useEffect } from "react"
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useDeepResearchStore } from "@/store/deepResearch"
import QuestionForm from "./QuestionForm"
export const QnA = () => {
    const { questions, isCompleted, topic, answers, setIsLoading } = useDeepResearchStore();

    const { sendMessage, messages, status } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/deep-research"
        })
    });

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

            setIsLoading(true);

            sendMessage({
                role: "user",
                parts: [{
                    type: "text",
                    text: messageContent
                }]
            });
        }
    }, [isCompleted, questions, answers, topic, sendMessage, setIsLoading]);

    // Update loading state based on chat status
    useEffect(() => {
        if (status === 'streaming' || status === 'submitted') {
            setIsLoading(true);
        } else if (status === 'ready') {
            setIsLoading(false);
        }
    }, [status, setIsLoading]);

    return (
        <div className="flex gap-4 w-full flex-col items-center justify-center mb-16">
            <QuestionForm
            />
        </div>
    )
}