"use client";

export default function ChatForm({
  message,
  setMessage,
}: {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      <textarea
        className="w-full resize-none rounded text-black p-3"
        rows={5}
        name="message"
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
      />
      <button className="p-3 rounded border-2 border-white w-full md:max-w-sm hover:bg-emerald-300">
        Ask
      </button>
    </>
  );
}
