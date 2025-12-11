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
      characters = new Characters(text.split(" "));
    } else {
      characters = new Characters();
    }

    setCharElems(characters.render());

    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div className={`${robotoMono.className} flex-1`}>
      <div className="flex h-full items-center justify-center text-3xl">
        <div className="flex flex-wrap justify-center max-w-4xl">
          {charElems}
        </div>
      </div>
    </div>
  );
}
