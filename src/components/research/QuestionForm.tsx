import React from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea";
import { useDeepResearchStore } from "@/store/deepResearch";

const formSchema = z.object({
    answer: z.string().min(1, "answer is required").max(50),
})

export default function QuestionForm() {
    const { questions, currentQuestion, answers, setCurrentQuestion, setAnswers, setIsCompleted, isLoading, setIsLoading } = useDeepResearchStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            answer: answers[currentQuestion] || "",
        },
    })

    React.useEffect(() => {
        form.setValue("answer", answers[currentQuestion] || "");
    }, [currentQuestion, answers, form]);


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        const newAnswers = [...answers];
        newAnswers[currentQuestion] = values.answer;
        setAnswers(newAnswers);
        if (currentQuestion === questions.length - 1) {
            setIsLoading(true);
            setIsCompleted(true);
        } else {
            // Move to next question (useEffect will update the form)
            setCurrentQuestion(currentQuestion + 1);
        }
    }
    if (questions.length === 0) return null;
    return (
        <Card className="w-full max-w-[90vw] sm:max-w-[80vw] xl:max-w-[50vw] shadow-none">
            <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-base text-primary/50 ">Question {currentQuestion + 1} of {questions.length}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 w-full px-4 sm:px-6">
                <p className="text-base">{questions[currentQuestion]}</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="answer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea placeholder="Enter your answer" {...field}
                                            className="px-4 py-2 text-base resize-none placeholder:text-sm border-black/20" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between items-center">
                            <Button type="button" variant={"outline"}
                                onClick={() => {
                                    if (currentQuestion > 0) {
                                        setCurrentQuestion(currentQuestion - 1);
                                    }
                                }}
                                disabled={currentQuestion === 0}
                            >Previous</Button>

                            <Button type="submit"
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <span className="flex items-center mr-2">
                                        <span className="h-2 w-2 bg-white rounded-full animate-pulse"></span>
                                    </span>
                                )}
                                {currentQuestion === questions.length - 1 ? "Start Research" : "Next"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <div className="px-4 sm:px-6 pb-4">
                <div className="h-1 w-full bg-gray-200 rounded">
                    <div className="h-1 bg-primary rounded transition-all duration-300"
                        style={{
                            width: `${((currentQuestion + 1) / questions.length) * 100}%`
                        }}
                    ></div>
                </div>
            </div>
        </Card>

    )
}
