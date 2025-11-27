"use client"
import React from "react"
import { useDeepResearchStore } from "@/store/deepResearch"
import QuestionForm from "./QuestionForm"
export const QnA = () => {
    const { questions } = useDeepResearchStore();
    // if (questions.length === 0) {
    //     return null;
    // }
    return (
        <div className="flex gap-4 w-full flex-col items-center justify-center mb-16">
            <QuestionForm
            />
        </div>
    )
}