"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const languages = ["javascript", "python", "java", "cpp", "ruby"];

export default function CodeEditor() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  const handleRunCode = () => {
    // In a real application, this would send the code to a backend for execution
    console.log("Running code:", code);
    alert("Code execution is simulated. Check the console for details.");
  };

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Code Editor</h2>
        <div className="space-y-4">
          <Select onValueChange={setLanguage} defaultValue={language}>
            <SelectTrigger>
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="grid md:grid-cols-2 gap-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono h-64 md:h-96"
              placeholder="Write your code here..."
            />
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              className="h-64 md:h-96 rounded-md"
            >
              {code || "// Your code preview will appear here..."}
            </SyntaxHighlighter>
          </div>
          <Button onClick={handleRunCode} className="w-full">
            Run Code
          </Button>
        </div>
      </div>
    </section>
  );
}
