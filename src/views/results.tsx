"use client";

import { useState } from "react";
import { mockStocks } from "../data/sample";

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

interface Props {
  query: string;
}

export function ResultsPage(props: Props) {
  const [query, setQuery] = useState(props.query);

  const onSearch = (newQuery: string) => {
    console.log(`Searching for: ${newQuery}`);
    setQuery(newQuery);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <div className="mt-6 mb-6">
        <SearchBar query={query} onSearch={onSearch} className="m-auto" />
      </div>

      <div className="mb-8">
        <Carousel className="w-lg m-auto animate-in">
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

      {/* Expandable Table Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 animate-neon">Detailed View</h2>
        <p className="text-[#8af] mb-3">Expand rows to see more info on each stock.</p>

        <Accordion type="single" collapsible className="w-full">
          <Table className="w-full border-separate border-spacing-y-2">
            <TableHeader>
              <TableRow className="[&>th]:bg-white/10 [&>th]:border-b [&>th]:border-[#0ff]">
                <TableHead className="p-2">Symbol</TableHead>
                <TableHead className="p-2">Price</TableHead>
                <TableHead className="p-2">% Change</TableHead>
                <TableHead className="p-2">Volume</TableHead>
                <TableHead className="p-2">Market Cap</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {mockStocks.map((stock, index) => (
                // Use the index or a stable unique ID as the AccordionItem value
                // <AccordionItem value={`item-${index}`} key={stock.ticker}>
                // <AccordionTrigger asChild>
                <TableRow
                  className="
                        bg-white/5 
                        hover:bg-white/10 
                        transition-colors 
                        cursor-pointer
                      "
                >
                  <TableCell className="p-2 font-semibold text-[#0ff]">{stock.ticker}</TableCell>
                  <TableCell className="p-2">${stock.price.toFixed(2)}</TableCell>
                  <TableCell
                    className={`p-2 ${stock.changePercent >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {stock.changePercent >= 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </TableCell>
                  <TableCell className="p-2">{stock.volume?.toLocaleString()}</TableCell>
                  <TableCell className="p-2">{stock.marketCap}</TableCell>
                </TableRow>
                // </AccordionTrigger>
                /* <AccordionContent>
                    <TableRow
                      className="
                        bg-white/10
                        transition-colors
                      "
                    >
                      <TableCell colSpan={5} className="p-4 text-white/80">
                        {stock.details}
                      </TableCell>
                    </TableRow>
                  </AccordionContent> */
                // {/* </AccordionItem> */}
              ))}
            </TableBody>
          </Table>
        </Accordion>
      </div>
    </div>
  );
}
