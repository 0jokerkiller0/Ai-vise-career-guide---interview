

"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";


const FIELDS = [
  "Python Developer",
  "MERN Developer",
  "Cloud Engineer",
  "Data Scientist",
  "DevOps Engineer",
  "UI/UX Designer",
];

export default function CareerGuidancePage() {
  const [selectedField, setSelectedField] = useState("");
  const [fieldInput, setFieldInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const field = fieldInput.trim() || selectedField;
    if (!input.trim() || !field) return;
    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/career-guidance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field, message: input }),
      });
      const data = await res.json();
      let aiText = data.response;
      if (!aiText || typeof aiText !== "string" || aiText.trim().length === 0) {
        aiText = "Sorry, I could not generate a response at this time.";
      }
      setMessages((msgs) => [...msgs, { sender: "ai", text: aiText }]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "ai", text: "Error contacting AI service. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Card className="bg-background/80 backdrop-blur shadow-2xl border border-gray-800 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">Career Guidance</CardTitle>
          <CardDescription className="text-lg">Get personalized career advice and guidance from AI. Select your field and start chatting!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 relative">
            <Label className="font-semibold text-lg min-w-[160px]">Job/Field:</Label>
            <div className="w-full md:w-80 relative">
              <Input
                type="text"
                placeholder="Type or select a job/field..."
                value={fieldInput || selectedField}
                onChange={e => {
                  setFieldInput(e.target.value);
                  setShowSuggestions(true);
                  setSelectedField("");
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                autoComplete="off"
              />
              {showSuggestions && (fieldInput.length > 0 || selectedField.length === 0) && (
                <div className="absolute z-10 w-full bg-background border border-gray-700 rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
                  {FIELDS.filter(f => f.toLowerCase().includes((fieldInput || "").toLowerCase())).length === 0 ? (
                    <div className="px-4 py-2 text-gray-400">No suggestions</div>
                  ) : (
                    FIELDS.filter(f => f.toLowerCase().includes((fieldInput || "").toLowerCase())).map(f => (
                      <div
                        key={f}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-500/20"
                        onMouseDown={() => {
                          setSelectedField(f);
                          setFieldInput("");
                          setShowSuggestions(false);
                        }}
                      >
                        {f}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="rounded-xl bg-black/60 border border-gray-700 shadow-inner p-6 h-80 overflow-y-auto flex flex-col gap-3 transition-all">
            {messages.length === 0 && <div className="text-gray-400 text-center my-auto">No messages yet.</div>}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex items-end gap-2 max-w-[80%]">
                  {msg.sender === "ai" && (
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold">AI</span>
                  )}
                  <div className={`px-4 py-2 rounded-2xl whitespace-pre-line text-base shadow-md ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-green-300 border border-blue-400/30"}`}>
                    {msg.text}
                  </div>
                  {msg.sender === "user" && (
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center text-white font-bold">U</span>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2 max-w-[80%]">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold">AI</span>
                  <div className="px-4 py-2 rounded-2xl bg-gray-800 text-green-300 border border-blue-400/30 text-base shadow-md flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <form className="flex gap-3" onSubmit={e => { e.preventDefault(); handleSend(); }}>
            <Input
              className="flex-1"
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!(fieldInput.trim() || selectedField) || loading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || !(fieldInput.trim() || selectedField) || loading}
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 font-semibold shadow disabled:opacity-50 transition-all"
            >
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
