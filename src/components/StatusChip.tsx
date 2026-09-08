import { Check, CircleDashed, Radio } from "lucide-react";
import { STATUS_LABEL, type WatchStatus } from "@/lib/watch-status";

const TONE: Record<WatchStatus, string> = {
  "not-started": "border-border text-muted-foreground",
  "in-progress": "border-primary/60 bg-primary/10 text-primary",
  completed: "border-accent/50 bg-accent/10 text-accent",
};

export function StatusChip({ status }: { status: WatchStatus }) {
  const Icon =
    status === "completed" ? Check : status === "in-progress" ? Radio : CircleDashed;
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.2em] ${TONE[status]}`}
    >
      <Icon className="h-3 w-3" /> {STATUS_LABEL[status]}
    </span>
  );
}
