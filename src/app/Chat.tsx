"use client";
import { FormEventHandler, useState, useRef } from "react";
import ChatForm from "./ChatForm";
import Message from "@/types/Message";

export default function Chat({ askChat }: { askChat: Function }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Barry! I'm the most helpfulest chatbot ever! Ask me any question, ask me for advice, or ask me to do something for you!",
    },
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (messagesEndRef.current) messagesEndRef.current.scrollTop += 10000;
    }, 100);
    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setMessage("");
    askChat(newMessages).then((response: Message) => {
      setMessages([...newMessages, response]);
      setLoading(false);
      setTimeout(() => {
        if (messagesEndRef.current) messagesEndRef.current.scrollTop += 10000;
      }, 100);
    });
  };

  return (
    <div className="h-[75vh] flex flex-col justify-between w-full">
      <div
        className="flex flex-col w-full gap-3 overflow-y-auto"
        ref={messagesEndRef}
      >
        {messages.map((message) => (
          <div
            key={message.content}
            className={`p-3 max-w-sm rounded-lg ${
              message.role === "assistant"
                ? "self-start bg-gray-300"
                : "self-end bg-emerald-300"
            }`}
          >
            <p>{message.content}</p>
          </div>
        ))}
        {loading && (
          <div className="p-3 max-w-sm rounded-lg self-start bg-gray-300">
            <p>...</p>
          </div>
        )}
      </div>
      <form className="w-full mt-3" onSubmit={handleSubmit}>
        <ChatForm message={message} setMessage={setMessage} />
      </form>
    </div>
  );
}
