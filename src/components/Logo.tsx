import { LogoIconBlueLotus } from "@/components/icons/logo-icon";

export function LotusMark({ className }: { className?: string }) {
  return <LogoIconBlueLotus className={className} />;
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoIconBlueLotus className="h-9 w-9 shrink-0 text-accent" />
      <span className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-[0.18em] text-foreground">
          BLUE LOTUS
        </span>
        <span className="mt-1 text-[10px] font-medium tracking-[0.22em] text-muted">
          THAI THERAPEUTIC MASSAGE
        </span>
      </span>
    </span>
  );
}
