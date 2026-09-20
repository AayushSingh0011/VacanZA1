import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Camera, MapPin, Phone, Search, ToggleLeft, Upload } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { AppShell, MapView, ValueIcon } from "@/components/vacanza-ui";
import { useVacanza } from "@/components/vacanza-store";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Vacanza — Find What's Vacant Right Now" },
    { name: "description", content: "Discover rental homes, flats and rooms with live availability updates from property owners." },
    { property: "og:title", content: "Vacanza — Live Rental Vacancy Discovery" },
    { property: "og:description", content: "Find what's vacant. Right now. Around you." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  const { properties } = useVacanza();
  const nearby = properties.slice(0, 5);
  const values = [
    { type: "live" as const, title: "Live availability", copy: "Fresh status from owners" },
    { type: "owner" as const, title: "Owner-listed", copy: "Direct, clearer listings" },
    { type: "location" as const, title: "Location-based", copy: "Discover around your area" },
    { type: "contact" as const, title: "Direct contact", copy: "Connect without friction" },
  ];
  const renterSteps = [{ icon: MapPin, title: "Choose your area", copy: "Search a locality or landmark." }, { icon: Search, title: "See vacant homes", copy: "Availability is visible at a glance." }, { icon: Phone, title: "Contact the owner", copy: "Reach out directly when ready." }];
  const ownerSteps = [{ icon: Building2, title: "Add your property", copy: "Create a clear rental listing." }, { icon: Camera, title: "Upload photos & details", copy: "Show renters what matters." }, { icon: ToggleLeft, title: "Keep status current", copy: "Switch between VACANT and FULL." }];
  return (
    <AppShell marketing>
      <section className="relative overflow-hidden border-b bg-hero py-14 sm:py-20 lg:py-24"><div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[.86fr_1.14fr] lg:px-8"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}><div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-bold text-success"><span className="size-2 animate-pulse rounded-full bg-success" />Live rental availability</div><h1 className="font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">Find what's vacant.<br /><span className="text-primary">Right now. Around you.</span></h1><p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">Discover rental homes, flats and rooms that are actually available — with live updates from property owners.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button size="lg" asChild><Link to="/find">Find a Home <ArrowRight /></Link></Button><Button size="lg" variant="outline" asChild><Link to="/list-property">List Your Property</Link></Button></div><p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><span className="flex -space-x-2">{[1,2,3].map((i) => <span key={i} className="grid size-7 place-items-center rounded-full border-2 border-background bg-secondary text-[10px] font-bold">{i === 1 ? "AD" : i === 2 ? "SR" : "RS"}</span>)}</span>Updated by local property owners</p></motion.div><motion.div initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .1 }} className="relative"><MapView properties={nearby} className="min-h-[470px] shadow-map" /><div className="absolute -bottom-5 -left-2 hidden rounded-card border bg-background p-4 shadow-xl sm:block"><p className="text-sm font-bold">2 BHK · ₹8,500/month</p><p className="mt-1 text-xs font-bold text-success">● VACANT</p><p className="mt-1 text-xs text-muted-foreground">Updated 8 min ago</p></div></motion.div></div></section>
      <section className="border-b bg-background"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border px-4 sm:px-6 lg:grid-cols-4 lg:px-8">{values.map((v) => <div key={v.title} className="flex gap-3 bg-background px-3 py-7 sm:px-5"><ValueIcon type={v.type} /><div><p className="text-sm font-bold">{v.title}</p><p className="mt-1 text-xs text-muted-foreground">{v.copy}</p></div></div>)}</div></section>
      <section className="py-20 sm:py-28"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase text-primary">How Vacanza works</p><h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">A faster path from searching to moving</h2></div><Steps title="For renters" steps={renterSteps} /><Steps title="For property owners" steps={ownerSteps} reverse /></div></section>
      <section className="bg-primary py-16 text-primary-foreground"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8"><div><h2 className="font-display text-3xl font-extrabold">A vacant home shouldn't stay hidden.</h2><p className="mt-2 text-primary-foreground/70">List it, update it, and reach renters nearby.</p></div><Button size="lg" variant="secondary" asChild><Link to="/list-property">List your property <Upload /></Link></Button></div></section>
    </AppShell>
  );
}

function Steps({ title, steps, reverse = false }: { title: string; steps: { icon: typeof Search; title: string; copy: string }[]; reverse?: boolean }) { return <div className="mt-16"><div className="mb-7 flex items-center gap-4"><h3 className="text-lg font-extrabold">{title}</h3><span className="h-px flex-1 bg-border" /></div><div className={reverse ? "grid gap-8 md:grid-cols-3" : "grid gap-8 md:grid-cols-3"}>{steps.map(({ icon: Icon, title: stepTitle, copy }, i) => <div key={stepTitle} className="relative"><span className="text-xs font-extrabold text-primary">0{i + 1}</span><span className="mt-4 grid size-12 place-items-center rounded-xl bg-secondary text-primary"><Icon /></span><h4 className="mt-5 text-lg font-bold">{stepTitle}</h4><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div></div>; }
