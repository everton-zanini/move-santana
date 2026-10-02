import { Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ArcadeGame } from "@/types/arcade";

export function GameCard({ game, index }: { game: ArcadeGame; index: number }) {
  return (
    <article className="relative flex flex-col border-4 border-double border-move-yellow bg-move-ink p-4 glow-yellow">
      <div className="scanlines relative flex aspect-video items-center justify-center overflow-hidden border-2 border-move-gray-700 bg-move-black">
        <Gamepad2 className="size-16 text-move-yellow" aria-hidden="true" />
        <span className="absolute left-2 top-2 font-accent text-xs font-bold uppercase tracking-widest text-move-black bg-move-yellow px-2 py-0.5">
          Jogo #{String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-4 font-display text-3xl uppercase leading-none text-move-white">
        {game.title}
      </h3>
      <p className="mt-2 text-move-gray-300">{game.description}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {game.tags.map((tag) => (
          <li
            key={tag}
            className="border border-move-gray-500 px-2 py-0.5 font-accent text-xs uppercase tracking-wide text-move-gray-300"
          >
            {tag}
          </li>
        ))}
      </ul>
      <Button
        href={game.url}
        variant="yellow"
        className="mt-5 self-start"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Jogar ${game.title} (abre em nova aba)`}
      >
        Jogar
      </Button>
    </article>
  );
}
