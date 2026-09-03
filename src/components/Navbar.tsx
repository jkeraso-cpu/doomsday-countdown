import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { id: "countdown", label: "COUNTDOWN" },
  { id: "watchlist", label: "WATCHLIST" },
  { id: "progress", label: "PROGRESS" },
  { id: "settings", label: "SETTINGS" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/70 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-xs font-bold tracking-[0.2em] text-foreground transition-colors hover:text-primary sm:text-sm"
        >
          DOOMSDAY <span className="text-primary">//</span> MISSION CONTROL
        </button>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => go(l.id)}
                className="label-hud transition-colors hover:text-primary"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="p-1 text-muted-foreground transition-colors hover:text-primary md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <ul className="border-t border-border bg-background/95 px-4 pb-4 pt-2 md:hidden">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => go(l.id)}
                className="label-hud block w-full py-3 text-left transition-colors hover:text-primary"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
