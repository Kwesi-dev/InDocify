"use client";

import { useState } from "react";
import { Send, X, Loader2, MinimizeIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 How can we help you today?",
      sender: "agent",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Simulate agent typing
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsTyping(false);

    // Add agent response
    const agentMessage: Message = {
      id: messages.length + 2,
      text: "Thanks for reaching out! One of our support agents will be with you shortly.",
      sender: "agent",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, agentMessage]);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-[80px] right-6 bg-[#CCFF00] text-black px-6 py-3 rounded-full hover:bg-[#CCFF00]/90 transition-colors font-medium shadow-lg z-50"
        >
          Chat with us
        </button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 w-96 bg-[#1a1f1a] rounded-lg shadow-xl border border-white/10 overflow-hidden z-50
              ${isMinimized ? "h-14" : "h-[600px]"}`}
          >
            {/* Header */}
            <div className="bg-[#CCFF00]/10 p-4 flex items-center justify-between">
              <h3 className="font-medium text-white">inDocify Support</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <MinimizeIcon className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="p-4 h-[472px] overflow-y-auto space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.sender === "user"
                            ? "bg-[#CCFF00] text-black"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 rounded-lg p-3 text-white">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <form
                  onSubmit={handleSubmit}
                  className="p-4 border-t border-white/10"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="bg-[#CCFF00] text-black p-2 rounded-lg hover:bg-[#CCFF00]/90 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
