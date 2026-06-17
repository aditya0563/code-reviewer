import { useState, useCallback } from "react";
import axios from "axios";
import DvdBouncingSquare from "./components/DvdBouncingSquare";
import CodeEditorPanel from "./components/CodeEditorPanel";
import AIAnalysisPanel from "./components/AIAnalysisPanel";

function App() {
  const [code, setCode] = useState(
    `function sum(a, b) {\n  return a + b;\n}\n\n// Try reviewing this code!\nconsole.log(sum(5, 10));`,
  );
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const reviewCode = useCallback(async () => {
    if (!code.trim() || isLoading) return;
    setIsLoading(true);
    setReview("");

    try {
      // Access the variable via import.meta.env
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/ai/get-review`,
        {
          prompt: code,
        },
      );
      setReview(response.data);
    } catch (error) {
      setReview(
        "⚠️ **Error connecting to the server.**\n\nPlease make sure your backend is running and the `VITE_API_URL` is configured correctly.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [code, isLoading]);

  return (
    <>
      <DvdBouncingSquare />
      <main className="h-screen w-full box-border p-8 md:p-12 relative z-10">
        <div className="h-full w-full flex flex-col md:flex-row gap-8">
          <CodeEditorPanel
            code={code}
            setCode={setCode}
            reviewCode={reviewCode}
            isLoading={isLoading}
          />
          <AIAnalysisPanel review={review} />
        </div>
      </main>
    </>
  );
}

export default App;
