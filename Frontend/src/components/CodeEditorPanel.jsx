import { useState } from "react";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { CodeIcon, RocketIcon } from "./Icons";

export default function CodeEditorPanel({
  code,
  setCode,
  reviewCode,
  isLoading,
  editorFocused,
  setEditorFocused,
}) {
  return (
    <section
      className={`flex flex-col flex-1 min-w-0 min-h-0 bg-[#12101A]/40 backdrop-blur-md border border-white/5 rounded-[24px] shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
        editorFocused
          ? "border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.08)]"
          : ""
      }`}
      style={{ padding: "32px" }}
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/5">
            <CodeIcon className="w-[18px] h-[18px] text-purple-400" />
          </div>
          <h1 className="text-[15px] font-semibold text-white/90">
            Code Editor
          </h1>
        </div>
        <span className="text-[11px] font-mono font-medium text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
          JavaScript
        </span>
      </header>

      {/* Editor container */}
      <div
        className="editor-container flex-1 overflow-auto bg-black/20 rounded-xl custom-scrollbar mb-6"
        onFocus={() => setEditorFocused(true)}
        onBlur={() => setEditorFocused(false)}
      >
        <Editor.default
          value={code}
          onValueChange={setCode}
          highlight={(code) =>
            prism.highlight(code, prism.languages.javascript, "javascript")
          }
          padding={20}
          textareaId="code-editor-textarea"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 14,
            background: "transparent",
            minHeight: "100%",
          }}
        />
      </div>

      {/* Button footer */}
      <div>
        <button
          onClick={reviewCode}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-[#9333EA] to-[#3B82F6] hover:opacity-90 transition-all shadow-lg disabled:opacity-50"
        >
          {isLoading ? (
            "Analyzing..."
          ) : (
            <>
              <RocketIcon className="w-4 h-4" /> Review Code
            </>
          )}
        </button>
      </div>
    </section>
  );
}
