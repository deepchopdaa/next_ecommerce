"use client";

import { useState, useEffect, useRef } from "react";
import {
    IconButton,
    TextField,
    CircularProgress,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ReactMarkdown from "react-markdown";

export default function ProductChatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const typeBotMessage = async (text) => {
        let current = "";
        for (let i = 0; i < text.length; i++) {
            current += text[i];
            setMessages((prev) => [
                ...prev.slice(0, -1),
                { role: "bot", text: current },
            ]);
            await new Promise((r) => setTimeout(r, 12));
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userText = input;
        setInput("");
        setMessages((prev) => [...prev, { role: "user", text: userText }]);
        setLoading(true);

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: userText }),
        });

        const data = await res.json();
        setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
        setLoading(false);
        // return data.reply
        // await typeBotMessage(data.reply);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center 
        h-14 w-14 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 
        text-white shadow-xl hover:scale-105 transition "
            >
                <ChatIcon />
            </button>

            {/* Side Chat Panel */}
            <div
                className={`fixed top-0 right-0 z-50 h-4/5 w-[380px] max-w-full 
        bg-white shadow-2xl transform transition-all duration-500 ease-in-out
        ${open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3
          bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white">
                    <div>
                        <h3 className="font-semibold text-sm">Shopping Assistant</h3>
                        <p className="text-xs opacity-90">Product recommendations & help</p>
                    </div>
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon className="text-white" />
                    </IconButton>
                </div>

                {/* Messages */}
                <div className="flex-1 h-[calc(100vh-130px)] overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow
                ${msg.role === "user"
                                        ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-br-none"
                                        : "bg-white text-gray-800 rounded-bl-none"
                                    }`}
                            >
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white px-4 py-2 rounded-xl shadow">
                                <CircularProgress size={18} />
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="flex items-center gap-2 p-3 border-t bg-white">
                    <TextField
                        size="small"
                        fullWidth
                        placeholder="Ask for products, brands, offers..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <IconButton
                        onClick={sendMessage}
                        className="text-white bg-gradient-to-r from-pink-500 to-orange-400"
                    >
                        <SendIcon />
                    </IconButton>
                </div>
            </div>
        </>
    );
}