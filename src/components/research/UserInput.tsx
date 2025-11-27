"use client"
import React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormMessage, FormItem } from "../ui/form";
import { Input } from "../ui/input"
import { useDeepResearchStore } from "@/store/deepResearch"
const formSchema = z.object({
    input: z.string().min(2).max(200),
})
const UserInput = () => {
    const { setQuestions, setTopic, setIsLoading, isLoading } = useDeepResearchStore()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            setTopic(values.input);
            const response = await fetch("/api/generate-questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ topic: values.input }),
            })
            const data = await response.json();
            console.log("API Response:", data);

            // Extract questions array from response
            if (data && data.questions) {
                setQuestions(data.questions);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row items-center justify-center gap-4 w-[50vw] ">
                <FormField
                    control={form.control}
                    name="input"
                    render={({ field }) => (
                        <FormItem className="flex-1 w-full">
                            <FormControl>
                                <Input placeholder="Enter your topic" {...field}
                                    className="rounded-full w-full p-4 py-6 placeholder:text-sm bg-white/60 border-solid shadow-none" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="rounded-full px-6 cursor-pointer" disabled={isLoading}>
                    {isLoading && (
                        <span className="flex items-center mr-2">
                            <span className="h-2 w-2 bg-white rounded-full animate-pulse"></span>
                        </span>
                    )}
                    {isLoading ? "Generating..." : "Submit"}
                </Button>
            </form>
        </Form>
    )
}
export default UserInput;