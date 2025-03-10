import { SearchBar } from "@/components/search-bar";
import clsx from "clsx";
import { useEffect, useState } from "react";

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

export function SearchPage(props: Props) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animateSearch, setAnimateSearch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const onSearch = (query: string) => {
    console.log(`sending query: ${query}`);
    setAnimateSearch(true);
    setTimeout(() => props.onSearch(query), 1000);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <span className="animate-hover">
        <h1
          className={clsx("text-5xl font-bold mb-10", "animate-neon-glow", {
            "transition-opacity opacity-0 duration-300": animateSearch,
          })}
        >
          What are you looking for?
        </h1>
      </span>

      <SearchBar
        placeholder={placeholders[placeholderIndex]}
        onSearch={onSearch}
        className={clsx({
          "translate-y-[-351px] duration-1000": animateSearch,
        })}
      />

      <p
        className={clsx("text-center text-[#4e4e4e] mt-8", {
          "transition-opacity opacity-0 duration-300": animateSearch,
        })}
      >
        Real-time, personalized market data.
      </p>
    </div>
  );
}
