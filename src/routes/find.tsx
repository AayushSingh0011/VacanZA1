import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { List, Map as MapIcon, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppShell, EmptyState, MapView, PageIntro, PropertyCard } from "@/components/vacanza-ui";
import { useVacanza } from "@/components/vacanza-store";

export const Route = createFileRoute("/find")({
  head: () => ({ meta: [
    { title: "Find a Home — Vacanza" }, { name: "description", content: "Search live rental vacancies by area, rent and property type." },
    { property: "og:title", content: "Find a Home — Vacanza" }, { property: "og:description", content: "See rental properties that are vacant right now." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: FindPage,
});

function FindPage() {
  const { properties } = useVacanza();
  const [query, setQuery] = useState(""); const [type, setType] = useState("all"); const [bhk, setBhk] = useState("all"); const [rent, setRent] = useState("all"); const [availability, setAvailability] = useState("all"); const [furnished, setFurnished] = useState("all"); const [selected, setSelected] = useState(properties[0]?.id); const [mobileMap, setMobileMap] = useState(false);
  const filtered = useMemo(() => properties.filter((p) => {
    const text = `${p.title} ${p.location} ${p.city}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (type === "all" || p.propertyType === type) && (bhk === "all" || p.bhk.startsWith(bhk)) && (rent === "all" || p.rent <= Number(rent)) && (availability === "all" || p.status === availability) && (furnished === "all" || String(p.furnished) === furnished);
  }).sort((a,b) => Number(b.status === "vacant") - Number(a.status === "vacant")), [properties, query, type, bhk, rent, availability, furnished]);
  const clear = () => { setQuery(""); setType("all"); setBhk("all"); setRent("all"); setAvailability("all"); setFurnished("all"); };
  return <AppShell><section className="border-b bg-background py-8"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><PageIntro eyebrow="Live vacancies" title="Find a home near you" copy="Search an area and see which rentals are actually available now." /><div className="relative mt-7"><Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} className="h-13 rounded-xl pl-12 text-base" placeholder="Search by area, locality or landmark" /></div><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6"><Filter value={type} onChange={setType} label="Property type" options={["Apartment", "Flat", "House", "Room", "PG"]} /><Filter value={bhk} onChange={setBhk} label="BHK" options={["1", "2", "3", "Studio"]} /><Filter value={rent} onChange={setRent} label="Rent range" options={["7000", "10000", "15000", "20000"]} labels={["Under ₹7k", "Under ₹10k", "Under ₹15k", "Under ₹20k"]} /><Filter value={availability} onChange={setAvailability} label="Availability" options={["vacant", "full"]} labels={["Vacant only", "Full"]} /><Filter value={furnished} onChange={setFurnished} label="Furnishing" options={["true", "false"]} labels={["Furnished", "Unfurnished"]} /><Button variant="ghost" onClick={clear}><X />Clear filters</Button></div></div></section><section className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6"><div className="mb-5 flex items-center justify-between"><p className="font-bold">{filtered.length} {filtered.length === 1 ? "property" : "properties"} found</p><Button className="lg:hidden" variant="outline" onClick={() => setMobileMap(!mobileMap)}>{mobileMap ? <List /> : <MapIcon />}{mobileMap ? "List View" : "Map View"}</Button></div>{mobileMap ? <MapView properties={filtered} selectedId={selected} onSelect={setSelected} className="lg:hidden" /> : <div className="grid gap-6 lg:grid-cols-[minmax(400px,42%)_1fr]"><div className="grid content-start gap-5">{filtered.length ? filtered.map((p) => <PropertyCard key={p.id} property={p} compact />) : <EmptyState />}</div><div className="sticky top-24 hidden h-[calc(100vh-7rem)] lg:block"><MapView properties={filtered} selectedId={selected} onSelect={setSelected} className="h-full" /></div></div>}</section></AppShell>;
}
function Filter({ value, onChange, label, options, labels }: { value: string; onChange: (v:string) => void; label: string; options: string[]; labels?: string[] }) { return <Select value={value} onValueChange={onChange}><SelectTrigger className="h-10 bg-background"><SelectValue placeholder={label} /></SelectTrigger><SelectContent><SelectItem value="all">{label}</SelectItem>{options.map((o,i) => <SelectItem value={o} key={o}>{labels?.[i] ?? o}</SelectItem>)}</SelectContent></Select>; }