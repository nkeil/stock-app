import { cn } from "@/lib/utils";

interface Props {
  data: number[];
  className?: string;
}

export function PriceChart({ data, className }: Props) {
  return (
    <div className={cn("rounded-lg p-5 w-fit", className)}>
      <div className="w-[158px] h-[100px]">
        <svg width="158" height="50">
          <polyline
            fill="none"
            stroke="#0ff"
            strokeWidth="3"
            points={data.map((n, i) => `${i * 8 + 2},${50 - n / 2}`).join(" ")}
          />
          <polyline
            fill="none"
            stroke="#0ee"
            strokeWidth="2"
            points={data.map((n, i) => `${i * 8 + 2},${50 - n / 2}`).join(" ")}
          />
        </svg>
      </div>
    </div>
  );
}
