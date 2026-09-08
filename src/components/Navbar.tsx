import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const LINKS = [
  { to: "/", label: "HOME" },
  { to: "/watch", label: "WATCH DASHBOARD" },
  { to: "/progress", label: "PROGRESS" },
  { to: "/settings", label: "SETTINGS" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/70 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
      >
        <Link
          to="/watch"
          className="font-display text-xs font-bold tracking-[0.2em] text-foreground transition-colors hover:text-primary sm:text-sm"
        >
          DOOMSDAY <span className="text-primary">//</span> WATCH
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "label-hud text-primary" }}
                inactiveProps={{ className: "label-hud hover:text-primary" }}
                className="transition-colors"
              >
                {l.label}
              </Link>
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
            <li key={l.to}>
              <Link
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-primary" }}
                className="label-hud block w-full py-3 text-left transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
