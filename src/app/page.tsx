import Image from "next/image";
import UserInput from "@/components/research/UserInput";
export default function Home() {
  return (

    <main className="flex min-h-screen w-full flex-col items-center justify-start gap-8 py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-8xl font-bold italic font-dancing-script bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Spirit Search
        </h1>
        <p className="text-gray-600 text-center">
          Enter a topic and answer few questions to generate a comprehensive research report
        </p>
      </div>
      <UserInput />
    </main>
  );
}
