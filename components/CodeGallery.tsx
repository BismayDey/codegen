"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";

const preGeneratedSnippets = [
  {
    language: "javascript",
    code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    title: "Fibonacci Sequence",
  },
  {
    language: "python",
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
    title: "Quicksort Algorithm",
  },
  {
    language: "java",
    code: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
    title: "Binary Search",
  },
];

export default function CodeGallery() {
  const [selectedSnippet, setSelectedSnippet] = useState(
    preGeneratedSnippets[0]
  );

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(selectedSnippet.code)
      .then(() => alert("Code copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Code Snippet Gallery
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            {preGeneratedSnippets.map((snippet, index) => (
              <Button
                key={index}
                onClick={() => setSelectedSnippet(snippet)}
                variant={selectedSnippet === snippet ? "default" : "outline"}
                className="w-full justify-start"
              >
                {snippet.title}
              </Button>
            ))}
          </div>
          <div className="md:col-span-2 relative">
            <SyntaxHighlighter
              language={selectedSnippet.language}
              style={vscDarkPlus}
              className="rounded-md"
            >
              {selectedSnippet.code}
            </SyntaxHighlighter>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2"
              onClick={copyToClipboard}
            >
              <ClipboardCopy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
