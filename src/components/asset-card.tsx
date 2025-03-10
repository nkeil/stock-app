import { PriceChart } from "./price-chart";
import { Card } from "./ui/card";
import { Asset, generateIncreasingPriceData } from "@/data/sample";
import {
  HiPlusCircle,
  HiCheckCircle,
  HiQuestionMarkCircle,
  HiExclamationCircle,
} from "react-icons/hi";
import { RiArrowRightSLine } from "react-icons/ri";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface Props {
  asset: Asset;
}

export function AssetCard({ asset }: Props) {
  const [isAdded, setIsAdded] = useState(false);
  const [stockData] = useState(generateIncreasingPriceData());
  const [command, setCommand] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommandSubmit();
    }
  };

  const handleCommandSubmit = () => {
    if (!command) return;
    console.log("Command submitted:", command);
    alert("Command result page not implemented yet. Assume redirect happens.");
    setCommand("");
  };

  return (
    <Card key={asset.ticker} className="h-fit relative border-2">
      {/* "add to watchlist" button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onClick={() => setIsAdded(!isAdded)}
              className="absolute top-6 left-6 text-white/80 cursor-pointer"
            >
              <div className="relative w-6 h-6">
                <HiPlusCircle
                  size={30}
                  className={cn(
                    "absolute transition-all duration-300",
                    isAdded ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100",
                  )}
                />
                <HiCheckCircle
                  size={30}
                  className={cn(
                    "absolute text-green-400 transition-all duration-300",
                    isAdded ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0",
                  )}
                />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isAdded ? "Remove from watchlist" : "Add to watchlist"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* info popover */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="absolute top-6 right-6 text-white/80 cursor-pointer">
            <HiQuestionMarkCircle size={30} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] space-y-3 text-sm leading-relaxed">
          <p>
            Apple Inc. (AAPL) is a leading player in their industry, with a market capitalization of
            $150,250,000.
          </p>
          <p>
            The stock has shown positive momentum recently, gaining 1.2% in value. Trading volume
            remains strong with an average of 587520 shares per day.
          </p>
          <p>
            Over the past 52 weeks, the stock has traded between $120.20 and $180.30, demonstrating
            60.10 points of volatility in this period.
          </p>
        </PopoverContent>
      </Popover>

      {/* Main content */}
      <div className="flex flex-col h-full pt-8">
        <div className="text-center mb-6">
          <div className="font-bold text-4xl text-[#0ff]">{asset.ticker}</div>
        </div>

        <div className="flex justify-around px-4 h-full">
          <div className="w-2/3">
            <PriceChart data={stockData} className="m-auto" />
          </div>
          <div className="w-1/3 flex flex-col gap-2 pl-4">
            <div className="text-white/80">{asset.name}</div>
            <div className="text-lg font-bold">${asset.price.toFixed(2)}</div>
            <div className={`${asset.changePercent >= 0 ? "text-green-400" : "text-red-400"}`}>
              <span>{asset.changePercent >= 0 ? "+" : ""}</span>
              <span>{asset.changePercent.toFixed(2)}%</span>
            </div>
          </div>
        </div>

        {/* alert */}
        <div className="mb-5 p-4 bg-yellow-500/25 rounded-xl border-2 border-dashed border-yellow-400/50 flex items-start gap-3 shadow-lg hover:scale-[1.02] transition-transform duration-200 max-w-[400px] mx-auto">
          <HiExclamationCircle className="text-yellow-400 flex-shrink-0 mt-1" size={24} />
          <div className="text-sm font-medium text-white/90 leading-relaxed">
            Breaking News! Recent earnings report exceeded expectations, powering a +5.2% price
            surge!
          </div>
        </div>

        {/* command input */}
        <div className="mx-4 flex justify-end">
          <div className="flex items-center gap-2 transition-all duration-300 ease-in-out w-full">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Buy 100 shares..."
              className="flex-1 rounded-md border border-white/5 py-1.5 px-3 focus:outline-none"
              ref={inputRef}
            />
            <RiArrowRightSLine
              size={24}
              className="text-white/80 cursor-pointer hover:text-white transition-colors"
              onClick={handleCommandSubmit}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
