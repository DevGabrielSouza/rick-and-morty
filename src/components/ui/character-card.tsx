import { CardContent, Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CharacterInfoProps {
  name: string;
  status: string;
  dimension: string;
  episodes: number;
  className?: string;
}

export function CharacterInfo({
  name,
  status,
  dimension,
  episodes,
  className,
}: CharacterInfoProps) {
  return (
    <CardContent className={cn(["flex flex-col items-center"], className)}>
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm font-medium flex items-center gap-1">
        <span className="flex items-center gap-1">
          <span
            className={cn([
              "rounded-full inline-block w-3 h-3",
              status === "Alive"
                ? "bg-green-500"
                : status === "Dead"
                ? "bg-red-500"
                : "bg-gray-500",
              "h-3 w-3",
            ])}
          >
            {""}
          </span>
          {status}
        </span>
      </p>
      <p className="text-sm font-medium flex items-center gap-1">
        <span className="font-semibold">Last seen:</span> {dimension}
      </p>
      <p className="text-sm font-medium flex items-center gap-1">
        {episodes} episodes
      </p>
    </CardContent>
  );
}

export type CharacterImageProps = {
  src: string;
  alt: string;
};

export function CharacterImage({ src, alt }: CharacterImageProps) {
  return (
    <div className="overflow-hidden rounded-t-xl">
      <img alt={alt} height={400} src={src} width={400} />
    </div>
  );
}

export type CharacterCardGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export default function CharacterCard({
  className,
  children,
}: CharacterCardGenericProps) {
  return (
    <div className={cn(["rounded-sm aspect-square", className])}>
      {children}
    </div>
  );
}
