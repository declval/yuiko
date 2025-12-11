"use client";

import { useEffect, useState } from "react";

export default function Text() {
  const [words, setWords] = useState(() => [] as string[]);

  useEffect(() => {
    const text = localStorage.getItem("text");

    if (text !== null && text.length > 0) {
      setWords(text.split(" "));
    }

    const textarea: HTMLTextAreaElement | null =
      document.querySelector("#text");

    if (textarea == null) {
      return;
    }

    const changeHandler = () => {
      const textareaValue = textarea.value.trim();

      localStorage.setItem("text", textareaValue);
      setWords(textareaValue.split(" "));
    };

    textarea.addEventListener("change", changeHandler);

    return () => textarea.removeEventListener("change", changeHandler);
  }, []);

  return (
    <div className="flex-1">
      <div className="flex h-full items-center justify-center mx-4">
        <textarea
          className="border-2 border-zinc-800 h-64 lg:w-4xl mb-4 outline-none p-4 resize-none rounded-sm w-full"
          defaultValue={words.join(" ")}
          id="text"
          placeholder="Enter some text to practice with"
        ></textarea>
      </div>
    </div>
  );
}
