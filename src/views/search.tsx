import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";

const placeholders: string[] = [
  "Five popular coins in the past week",
  "Options for long-term investments",
  "Top 10 trending Solana tokens",
  "Climate change related crypto investments",
  "Trustworthy new crypto projects",
];

interface Props {
  onSearch: (query: string) => void;
}

export function Search({ onSearch }: Props) {
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animatePlaceholder, setAnimatePlaceholder] = useState(false);
  const [animateSearch, setAnimateSearch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // don't run if user has typed something
      if (query) return;

      // increment placeholder
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);

      // play animation in 0.5s
      setAnimatePlaceholder(true);
      setTimeout(() => setAnimatePlaceholder(false), 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [query]);

  const handleSearch = () => {
    if (!query) return;
    console.log(`sending query: ${query}`);
    setAnimateSearch(true);
    onSearch(query);
  };

  const prevPlaceholder = () => {
    return placeholders[(placeholders.length + placeholderIndex - 1) % placeholders.length];
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-5xl font-bold mb-10 animate-neon-glow">What are you looking for?</h1>

      <div
        className={clsx(
          "relative overflow-hidden flex w-full max-w-xl bg-white/10 p-2 rounded-md transition-all duration-300 ",
          {
            "hover:shadow-[0_0_10px_#777] hover:translate-y-[-2px]": !animateSearch,
            // "translate-y-[-100px]": animateSearch,
          },
        )}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-xl text-white"
        />
        {!query && (
          <label
            className={clsx("absolute text-lg pointer-events-none text-[#8c8e93]", {
              "animate-slide-from-left": animatePlaceholder,
            })}
          >
            {placeholders[placeholderIndex]}
          </label>
        )}
        {!query && animatePlaceholder && (
          <label
            className={"absolute pointer-events-none text-lg text-[#8c8e93] animate-slide-right"}
          >
            {prevPlaceholder()}
          </label>
        )}
        <button
          onClick={handleSearch}
          className="bg-[#0ff] text-[#0A0F0D] font-bold py-2 px-4 ml-4 rounded-md cursor-pointer transition-transform duration-200 hover:-translate-y-px hover:shadow-[0_0_10px_#0ff] active:translate-y-px active:shadow-[0_0_5px_#0ff]"
        >
          <IoSend />
        </button>
      </div>

      <p className="text-center text-[#4e4e4e] mt-8">Real-time, personalized market data.</p>
    </div>
  );
}
