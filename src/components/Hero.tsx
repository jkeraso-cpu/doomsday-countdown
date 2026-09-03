import { RELEASE_LABEL } from "@/config";

export function Hero() {
  return (
    <section className="relative flex min-h-[52vh] flex-col items-center justify-center px-4 pb-10 pt-28 text-center sm:min-h-[58vh]">
      <p className="label-hud text-silver/70">Marvel Studios</p>
      <h1 className="mt-4 text-[2rem] font-black leading-[0.95] tracking-[0.14em] text-glow sm:text-6xl lg:text-7xl">
        AVENGERS: DOOMSDAY
      </h1>
      <div className="hud-rule mt-6 w-40 sm:w-72" />
      <p className="label-hud mt-6 text-foreground/85">The countdown has begun</p>
      <p className="mt-3 font-mono text-sm tracking-[0.3em] text-primary sm:text-base">
        {RELEASE_LABEL}
      </p>
      <p className="label-hud mt-8 text-[0.6rem] text-accent/80">
        Multiverse status: monitoring
      </p>
    </section>
  );
}
