import Chat from "./Chat";
import Message from "@/types/Message";
import OpenAI from "openai";
import Image from "next/image";

const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default function Home() {
  async function askChat(messages: Message[]) {
    "use server";
    const systemPrompt = {
      role: "system",
      content:
        "You are a clueless, unhelpful chatbot. You don't know much, but you're very confident and you're sure you're right. Your name is Barry. If the user asks you for advice, give terrible advice. If the user asks you for information, give obviously wrong information. If the user asks you to do something, come up with a rediculous excuse to not do it.",
    };
    // @ts-ignore
    const promptMessages = messages.reduce((acc, message, index) => {
      if (index === 0) return [...acc, systemPrompt, message];
      if (index % 5 === 0) return [...acc, message, systemPrompt];
      return [...acc, message];
    }, []);
    const completion = await openAI.chat.completions.create({
      // @ts-ignore
      messages: promptMessages,
      model: "gpt-3.5-turbo",
    });
    return completion.choices[0].message;
  }
  return (
    <div className="min-h-screen max-h-screen px-3">
      <div className="w-full h-[20vh]">
        <h1 className="text-2xl text-center">Hi! I&apos;m Barry!</h1>
        <Image
          src="/barry.png"
          alt="Barry the chatbot"
          className="mx-auto"
          width={200}
          height={200}
        />
      </div>
      <Chat askChat={askChat} />
    </div>
  );
}
