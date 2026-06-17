import { useState, useCallback, useRef } from "react";
import Markdown from "react-markdown";
import "highlight.js/styles/github-dark.css";
import "katex/dist/katex.min.css";
import { SparklesIcon, ClipboardIcon, CheckIcon } from "./Icons";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={`absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors z-20 ${copied ? "text-green-400" : ""}`}
    >
      {copied ? (
        <CheckIcon className="w-4 h-4" />
      ) : (
        <ClipboardIcon className="w-4 h-4" />
      )}
    </button>
  );
}

function PreBlock({ children, ...props }) {
  const ref = useRef(null);
  const getCodeText = () => (ref.current ? ref.current.textContent || "" : "");

  return (
    <div className="relative group rounded-xl overflow-hidden my-4 border border-white/5 bg-black/40">
      <pre ref={ref} className="p-4 overflow-x-auto text-[13px]" {...props}>
        {children}
      </pre>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <CopyButton text={getCodeText()} />
      </div>
    </div>
  );
}

export default function AIAnalysisPanel({ review }) {
  return (
    <aside
      className="flex flex-col flex-1 min-w-0 min-h-0 bg-[#12101A]/40 backdrop-blur-md border border-white/5 rounded-[24px] shadow-2xl transition-all duration-300 ease-in-out overflow-hidden"
      style={{ padding: "32px" }}
    >
      {/* Header */}
      <header className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/5">
          <SparklesIcon className="w-[18px] h-[18px] text-violet-400" />
        </div>
        <h2 className="text-[15px] font-semibold text-white/90">
          AI Analysis
        </h2>
      </header>

      {/* Content area */}
      <div className="flex-1 overflow-auto bg-black/20 rounded-xl p-4 custom-scrollbar">
        {review ? (
          <div className="markdown-body prose prose-invert max-w-none">
            <Markdown components={{ pre: PreBlock }}>{review}</Markdown>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-10 opacity-70">
            <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-[20px] bg-white/5 border border-white/5">
              <SparklesIcon className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-gray-300 font-medium mb-2">No analysis yet</p>
          </div>
        )}
      </div>
    </aside>
  );
}
