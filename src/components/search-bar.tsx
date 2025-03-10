import clsx from "clsx";
import { FormEventHandler, useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";

interface Props {
  query?: string;
  className?: string;
  placeholder?: string;
  onSearch: (query: string) => void;
}

export const SearchBar = (props: Props) => {
  const [query, setQuery] = useState(props.query ?? "");
  const [prevPlaceholder, setPrevPlaceholder] = useState(props.placeholder ?? "");
  const [animatePlaceholder, setAnimatePlaceholder] = useState(false);

  useEffect(() => {
    // play animation for 0.5s
    setAnimatePlaceholder(true);
    setTimeout(() => {
      setPrevPlaceholder(props.placeholder ?? "");
      setAnimatePlaceholder(false);
    }, 500);
  }, [props.placeholder]);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!query) return;
    props.onSearch(query);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={clsx(
        "relative overflow-hidden flex w-full max-w-xl bg-white/10 p-2 rounded-md transition-all",
        props.className,
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
          {props.placeholder}
        </label>
      )}
      {!query && animatePlaceholder && (
        <label
          className={"absolute pointer-events-none text-lg text-[#8c8e93] animate-slide-right"}
        >
          {prevPlaceholder}
        </label>
      )}
      <button
        type="submit"
        className="bg-[#0ff] text-[#0A0F0D] font-bold py-2 px-4 ml-4 rounded-md cursor-pointer transition-transform duration-200 hover:-translate-y-px hover:shadow-[0_0_10px_#0ff] active:translate-y-px active:shadow-[0_0_5px_#0ff]"
      >
        <IoSend />
      </button>
    </form>
  );
};
