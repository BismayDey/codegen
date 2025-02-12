"use client";

import { useState, useEffect } from "react";
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
import { Download } from "lucide-react";

const languages = [
  "javascript",
  "python",
  "java",
  "cpp",
  "ruby",
  "html",
  "css",
];

export default function CodeEditor() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (language === "html" || language === "css") {
      updatePreview();
    }
  }, [language]);

  const updatePreview = () => {
    if (language === "html") {
      setPreview(code);
    } else if (language === "css") {
      setPreview(`
        <html>
          <head>
            <style>${code}</style>
          </head>
          <body>
            <div class="preview-content">
              <h1>Preview Content</h1>
              <p>This is a paragraph.</p>
              <button>Button</button>
            </div>
          </body>
        </html>
      `);
    }
  };

  const handleRunCode = () => {
    // In a real application, this would send the code to a backend for execution
    console.log("Running code:", code);
    alert("Code execution is simulated. Check the console for details.");
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Code Editor</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Select onValueChange={setLanguage} defaultValue={language}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={downloadCode}>
              <Download className="h-4 w-4 mr-2" />
              Download Code
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono h-64 md:h-96"
              placeholder="Write your code here..."
            />
            {language === "html" || language === "css" ? (
              <iframe
                srcDoc={preview}
                title="preview"
                className="w-full h-64 md:h-96 border rounded-md"
              />
            ) : (
              <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                className="h-64 md:h-96 rounded-md"
              >
                {code || "// Your code preview will appear here..."}
              </SyntaxHighlighter>
            )}
          </div>
          {!["html", "css"].includes(language) && (
            <Button onClick={handleRunCode} className="w-full">
              Run Code
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
