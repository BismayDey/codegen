"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ClipboardCopy, Download } from "lucide-react";

const languages = [
  "javascript",
  "python",
  "java",
  "cpp",
  "ruby",
  "html",
  "css",
];
const snippetTypes = [
  "Function",
  "Class",
  "Loop",
  "Conditional",
  "API Request",
  "HTML Structure",
  "CSS Styling",
];

export default function CodeGenerator() {
  const [language, setLanguage] = useState("");
  const [snippetType, setSnippetType] = useState("");
  const [description, setDescription] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [asyncOption, setAsyncOption] = useState(false);
  const [parameterCount, setParameterCount] = useState(0);

  const handleGenerate = () => {
    // In a real application, this would call an API to generate the code
    let code = "";
    switch (language) {
      case "html":
        code = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${description}</title>
</head>
<body>
    <!-- ${snippetType} -->
    <!-- Your code here... -->
</body>
</html>`;
        break;
      case "css":
        code = `/* ${snippetType} for ${description} */
.example-class {
    /* Your styles here... */
}`;
        break;
      default:
        code = `// Generated ${snippetType} in ${language}\n\n`;
        if (asyncOption && ["javascript", "python"].includes(language)) {
          code += "async ";
        }
        code += `function exampleFunction(`;
        for (let i = 0; i < parameterCount; i++) {
          code += `param${i + 1}${i < parameterCount - 1 ? ", " : ""}`;
        }
        code += `) {\n  // ${description}\n  // Your code here...\n}`;
    }
    setGeneratedCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedCode)
      .then(() => alert("Code copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `generated_code.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Generate Your Code
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Select onValueChange={setLanguage}>
              <SelectTrigger>
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
            <Select onValueChange={setSnippetType}>
              <SelectTrigger>
                <SelectValue placeholder="Select Snippet Type" />
              </SelectTrigger>
              <SelectContent>
                {snippetTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Describe your code snippet..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-32"
            />
            {["javascript", "python"].includes(language) && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="async"
                  checked={asyncOption}
                  onCheckedChange={(checked) =>
                    setAsyncOption(checked as boolean)
                  }
                />
                <Label htmlFor="async">Async Function</Label>
              </div>
            )}
            {!["html", "css"].includes(language) && (
              <div className="flex items-center space-x-2">
                <Label htmlFor="params">Number of Parameters:</Label>
                <Input
                  id="params"
                  type="number"
                  value={parameterCount}
                  onChange={(e) =>
                    setParameterCount(Number.parseInt(e.target.value))
                  }
                  className="w-20"
                />
              </div>
            )}
            <Button onClick={handleGenerate} className="w-full">
              Generate Code
            </Button>
          </div>
          <div className="relative">
            <SyntaxHighlighter
              language={language || "javascript"}
              style={vscDarkPlus}
              className="h-full rounded-md"
            >
              {generatedCode || "// Your generated code will appear here..."}
            </SyntaxHighlighter>
            {generatedCode && (
              <div className="absolute top-2 right-2 space-x-2">
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  <ClipboardCopy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={downloadCode}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
