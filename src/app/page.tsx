"use client";

import { ResultsPage } from "@/views/results";
import { SearchPage } from "@/views/search";
import { useState } from "react";

export default function Home() {
  const [stage, setStage] = useState<"search" | "results">("search");
  const [query, setQuery] = useState("");

  const onSearch = (query: string) => {
    console.log("searching for:", query);
    setStage("results");
    setQuery(query);
  };

  return (
    <div>
      {stage === "search" ? <SearchPage onSearch={onSearch} /> : <ResultsPage query={query} />}
    </div>
  );
}
