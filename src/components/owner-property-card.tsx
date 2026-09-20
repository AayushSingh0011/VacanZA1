import { Link } from "@tanstack/react-router";
import { Edit3, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Freshness, StatusBadge } from "@/components/vacanza-ui";
import { useVacanza } from "@/components/vacanza-store";
import { formatRent, type Property } from "@/lib/vacanza-data";

export function OwnerPropertyCard({ property }: { property: Property }) {
  const { setStatus } = useVacanza(); const [open, setOpen] = useState(false); const next = property.status === "vacant" ? "full" : "vacant";
  const confirm = () => { setStatus(property.id, next); setOpen(false); toast.success(`${property.title} is now marked ${next.toUpperCase()}`); };
  return <><article className="grid overflow-hidden rounded-card border bg-card shadow-card sm:grid-cols-[210px_1fr]"><img src={property.images[0]} alt={property.title} loading="lazy" width={1408} height={912} className="h-48 w-full object-cover sm:h-full" /><div className="p-5"><div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4"><div className="min-w-0"><h3 className="truncate text-lg font-extrabold">{property.title}</h3><p className="mt-1 text-sm text-muted-foreground">{property.bhk} · {formatRent(property.rent)}/month</p></div><StatusBadge property={property} /></div><div className="mt-4"><Freshness property={property} /></div><div className="mt-5 flex flex-wrap gap-2"><Button variant={next === "full" ? "destructive" : "default"} onClick={() => setOpen(true)}>Mark {next === "full" ? "Full" : "Vacant"}</Button><Button asChild variant="outline"><Link to="/owner/property/$propertyId" params={{ propertyId: property.id }}><Edit3 />Edit</Link></Button><Button asChild variant="ghost"><Link to="/property/$propertyId" params={{ propertyId: property.id }}><Eye />View</Link></Button></div></div></article><Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>Mark this property as {next.toUpperCase()}?</DialogTitle><DialogDescription>{next === "full" ? "This will remove it from active vacant-property results." : "Renters will immediately see this property as available."}</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button variant={next === "full" ? "destructive" : "default"} onClick={confirm}>Confirm</Button></DialogFooter></DialogContent></Dialog></>;
}