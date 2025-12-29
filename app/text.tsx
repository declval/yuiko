"use client";

import Characters from "@/app/characters";
import { Roboto_Mono } from "next/font/google";
import { useEffect, useState } from "react";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
});

let characters: Characters;

export default function Text() {
  const [charElems, setCharElems] = useState(() => [] as React.JSX.Element[]);
  const [accuracy, setAccuracy] = useState(-1);
  const [speed, setSpeed] = useState(-1);

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key.length > 1) {
      return;
    }

    characters.next(event.key);

    setCharElems(characters.render());
  };

  useEffect(() => {
    const text = localStorage.getItem("text");

    if (text !== null && text.length > 0) {
      characters = new Characters(setAccuracy, setSpeed, text.split(" "));
    } else {
      characters = new Characters(setAccuracy, setSpeed);
    }

    setCharElems(characters.render());

    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div className={`${robotoMono.className} flex-1`}>
      <div className="flex flex-col h-full items-center justify-center">
        <div className="flex flex-wrap justify-center max-w-4xl text-3xl">
          {charElems}
        </div>
        <div className="flex gap-4 mt-8 text-zinc-600">
          <div>
            {speed >= 0 ? speed : "-"}
            <span className="text-sm">WPM</span>
          </div>
          <div>
            {accuracy >= 0 ? accuracy : "-"}
            <span className="text-sm">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
