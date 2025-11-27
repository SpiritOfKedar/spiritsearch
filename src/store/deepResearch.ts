import { create } from 'zustand'

interface ResearchState {
    topic: string;
    setTopic: (topic: string) => void;
    questions: string[];
    setQuestions: (questions: string[]) => void;
    answers: string[];
    setAnswers: (answers: string[]) => void;
    currentQuestion: number;
    setCurrentQuestion: (index: number) => void;
    isCompleted: boolean;
    setIsCompleted: (isCompleted: boolean) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

const initialState = {
    topic: "",
    questions: [] as string[],
    answers: [] as string[],
    currentQuestion: 0,
    isCompleted: false,
    isLoading: false,
}
export const useDeepResearchStore = create<ResearchState>((set) => ({
    ...initialState,
    setTopic: (topic: string) => set({ topic }),
    setQuestions: (questions: string[]) => set({ questions }),
    setAnswers: (answers: string[]) => set({ answers }),
    setCurrentQuestion: (currentQuestion: number) => set({ currentQuestion }),
    setIsCompleted: (isCompleted: boolean) => set({ isCompleted }),
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
})) 