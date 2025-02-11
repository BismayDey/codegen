"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { ClipboardCopy } from "lucide-react"

const languages = ["javascript", "python", "java", "cpp", "ruby"]
const snippetTypes = ["Function", "Class", "Loop", "Conditional", "API Request"]

export default function CodeGenerator() {
  const [language, setLanguage] = useState("")
  const [snippetType, setSnippetType] = useState("")
  const [description, setDescription] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")
  const [asyncOption, setAsyncOption] = useState(false)
  const [parameterCount, setParameterCount] = useState(0)

  const handleGenerate = () => {
    // In a real application, this would call an API to generate the code
    let code = `// Generated ${snippetType} in ${language}\n\n`
    if (asyncOption) {
      code += "async "
    }
    code += `function exampleFunction(`
    for (let i = 0; i < parameterCount; i++) {
      code += `param${i + 1}${i < parameterCount - 1 ? ", " : ""}`
    }
    code += `) {\n  // ${description}\n  // Your code here...\n}`
    setGeneratedCode(code)
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedCode)
      .then(() => alert("Code copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err))
  }

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Generate Your Code</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Select onValueChange={setLanguage}>
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
            <div className="flex items-center space-x-2">
              <Checkbox
                id="async"
                checked={asyncOption}
                onCheckedChange={(checked) => setAsyncOption(checked as boolean)}
              />
              <Label htmlFor="async">Async Function</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="params">Number of Parameters:</Label>
              <Input
                id="params"
                type="number"
                value={parameterCount}
                onChange={(e) => setParameterCount(Number.parseInt(e.target.value))}
                className="w-20"
              />
            </div>
            <Button onClick={handleGenerate} className="w-full">
              Generate Code
            </Button>
          </div>
          <div className="relative">
            <SyntaxHighlighter language={language || "javascript"} style={vscDarkPlus} className="h-full rounded-md">
              {generatedCode || "// Your generated code will appear here..."}
            </SyntaxHighlighter>
            {generatedCode && (
              <Button variant="outline" size="icon" className="absolute top-2 right-2" onClick={copyToClipboard}>
                <ClipboardCopy className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

