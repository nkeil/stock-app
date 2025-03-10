"use client";

import { useState, useRef } from "react";
import { mockStocks } from "../data/sample";
import { BsChevronDown } from "react-icons/bs";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchBar } from "@/components/search-bar";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { StockCard } from "@/components/stock-card";
import { cn } from "@/lib/utils";

interface Props {
  query: string;
}

export function ResultsPage(props: Props) {
  const [query, setQuery] = useState(props.query);
  const [showTable, setShowTable] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const onSearch = (newQuery: string) => {
    console.log(`Searching for: ${newQuery}`);
    setQuery(newQuery);
  };

  const onClickShowMore = () => {
    setShowTable(true);
    setTimeout(() => {
      window.scrollTo({ top: 530, behavior: "smooth" });
    }, 0);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* search bar */}
      <div className="fixed top-6 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm z-50">
        <SearchBar query={query} onSearch={onSearch} className="m-auto" />
      </div>

      {/* carousel */}
      <div className="mb-8 mt-32">
        <Carousel className="w-lg m-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <CarouselContent>
            {mockStocks.map((stock) => (
              <CarouselItem key={stock.ticker}>
                <StockCard asset={stock} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* show more button */}
      {!showTable && (
        <button
          onClick={onClickShowMore}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 hover:bg-white/5 rounded-full px-4 py-2 transition-all animate-hover flex items-center gap-2 cursor-pointer text-white/40"
          aria-label="Show detailed view"
        >
          <div className="text-sm text-md">Show More</div>
          <BsChevronDown size={18} />
        </button>
      )}

      {/* table */}
      <div
        ref={tableRef}
        className={cn(
          "mt-8 mb-8 transition-all duration-500",
          showTable
            ? "opacity-100 translate-y-0 animate-in fade-in slide-in-from-bottom-8 duration-1000"
            : "opacity-0 translate-y-4 hidden",
        )}
      >
        <Table className="w-3xl m-auto text-center">
          <TableHeader>
            <TableRow className="border-b-0 hover:bg-transparent">
              <TableHead className="text-gray-400 text-md text-center">Symbol</TableHead>
              <TableHead className="text-gray-400 text-md text-center">Price</TableHead>
              <TableHead className="text-gray-400 text-md text-center">% Change</TableHead>
              <TableHead className="text-gray-400 text-md text-center">Volume</TableHead>
              <TableHead className="text-gray-400 text-md text-center">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...mockStocks, ...mockStocks, ...mockStocks].map((stock, i) => (
              <TableRow
                key={i}
                className="bg-card/40 hover:bg-card/60 transition-colors cursor-pointer rounded-lg overflow-hidden border-b-0"
              >
                <TableCell className="text-md text-primary">{stock.ticker}</TableCell>
                <TableCell className="text-md">${stock.price.toFixed(2)}</TableCell>
                <TableCell
                  className={cn(
                    "text-md",
                    stock.changePercent >= 0 ? "text-emerald-400" : "text-rose-400",
                  )}
                >
                  {stock.changePercent >= 0 ? "+" : ""}
                  {stock.changePercent.toFixed(2)}%
                </TableCell>
                <TableCell className="text-md text-gray-400">
                  {stock.volume?.toLocaleString()}
                </TableCell>
                <TableCell className="text-md text-gray-400">{stock.marketCap}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
