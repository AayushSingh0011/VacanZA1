import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MapPin, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AppShell,
  PageIntro,
  PropertyCard,
} from "@/components/vacanza-ui";

import { useVacanza } from "@/components/vacanza-store";
import {
  initialProperties,
  type Availability,
} from "@/lib/vacanza-data";

import { cn } from "@/lib/utils";

export const Route = createFileRoute("/list-property")({
  head: () => ({
    meta: [
      {
        title: "List Your Property — Vacanza",
      },
      {
        name: "description",
        content:
          "Create a rental listing and mark its live availability.",
      },
      {
        property: "og:title",
        content: "List Your Property — Vacanza",
      },
      {
        property: "og:description",
        content:
          "Publish your rental with live VACANT or FULL status.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: ListProperty,
});

function ListProperty() {
  const { addProperty } = useVacanza();
  const navigate = useNavigate();

  const [title, setTitle] =
    useState("Green Residency 2BHK");

  const [type, setType] =
    useState("Apartment");

  const [bhk, setBhk] =
    useState("2 BHK");

  const [rent, setRent] =
    useState("8500");

  const [deposit, setDeposit] =
    useState("17000");

  const [area, setArea] =
    useState("City Centre");

  const [city, setCity] =
    useState("Haldia");

  const [state, setState] =
    useState("West Bengal");

  const [status, setStatus] =
    useState<Availability>("vacant");

  // Selected photos
  const [photos, setPhotos] =
    useState<string[]>([]);

  // Handle photo selection
  const handlePhotoChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(
      event.target.files || []
    );

    if (files.length === 0) {
      return;
    }

    if (photos.length + files.length > 5) {
      toast.error(
        "You can upload a maximum of 5 photos."
      );

      event.target.value = "";
      return;
    }

    const invalidFile = files.find(
      (file) =>
        ![
          "image/jpeg",
          "image/png",
          "image/webp",
        ].includes(file.type)
    );

    if (invalidFile) {
      toast.error(
        "Only JPG, PNG and WEBP images are allowed."
      );

      event.target.value = "";
      return;
    }

    const oversizedFile = files.find(
      (file) => file.size > 5 * 1024 * 1024
    );

    if (oversizedFile) {
      toast.error(
        "Each photo must be smaller than 5MB."
      );

      event.target.value = "";
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;

        if (typeof result !== "string") {
          return;
        }

        setPhotos((current) => {
          if (current.length >= 5) {
            return current;
          }

          return [...current, result];
        });
      };

      reader.readAsDataURL(file);
    });

    event.target.value = "";

    toast.success(
      `${files.length} photo${
        files.length === 1 ? "" : "s"
      } selected`
    );
  };

  const removePhoto = (index: number) => {
    setPhotos((current) =>
      current.filter(
        (_, photoIndex) =>
          photoIndex !== index
      )
    );
  };

  const preview = {
    ...initialProperties[0],

    id: "preview",

    title,

    propertyType: type,

    bhk,

    rent: Number(rent) || 0,

    deposit: Number(deposit) || 0,

    location: area,

    city,

    status,

    images:
      photos.length > 0
        ? photos
        : initialProperties[0].images,

    lastUpdated: "just now",
  };

  const publish = () => {
    if (!title.trim()) {
      toast.error(
        "Please enter a property title."
      );
      return;
    }

    if (!rent || Number(rent) <= 0) {
      toast.error(
        "Please enter a valid monthly rent."
      );
      return;
    }

    if (!area.trim() || !city.trim()) {
      toast.error(
        "Please enter the property location."
      );
      return;
    }

    const id = `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;

    addProperty({
      ...preview,

      id,

      images:
        photos.length > 0
          ? photos
          : initialProperties[0].images,

      lastUpdated: "just now",
    });

    toast.success(
      "Property published successfully!"
    );

    navigate({
      to: "/owner",
    });
  };

  return (
    <AppShell>
      <section className="bg-muted/45 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <PageIntro
            eyebrow="Owner listing"
            title="List your property"
            copy="Add clear details, choose the current status, and publish your rental."
          />

          <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_380px]">

            <div className="space-y-7">

              {/* PHOTOS */}
              <FormSection title="Property photos">

                <label className="grid min-h-44 cursor-pointer place-items-center rounded-card border-2 border-dashed bg-background p-6 text-center transition-colors hover:border-primary">

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    className="sr-only"
                    onChange={handlePhotoChange}
                  />

                  <div>
                    <span className="mx-auto grid size-12 place-items-center rounded-full bg-secondary">
                      <UploadCloud />
                    </span>

                    <p className="mt-3 font-bold">
                      Upload property photos
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      JPG, PNG or WEBP · Maximum 5 photos · 5MB each
                    </p>
                  </div>

                </label>

                {/* PHOTO PREVIEWS */}
                {photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">

                    {photos.map(
                      (photo, index) => (
                        <div
                          key={`${photo}-${index}`}
                          className="group relative overflow-hidden rounded-xl border bg-background"
                        >

                          <img
                            src={photo}
                            alt={`Property photo ${
                              index + 1
                            }`}
                            className="h-36 w-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removePhoto(index)
                            }
                            className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
                            aria-label={`Remove photo ${
                              index + 1
                            }`}
                          >
                            <X size={16} />
                          </button>

                          {index === 0 && (
                            <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                              Main photo
                            </span>
                          )}

                        </div>
                      )
                    )}

                  </div>
                )}

                {photos.length > 0 && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    {photos.length}/5 photos selected
                  </p>
                )}

              </FormSection>

              {/* PROPERTY DETAILS */}
              <FormSection title="Property details">

                <div className="grid gap-5 sm:grid-cols-2">

                  <Field
                    label="Property title"
                    value={title}
                    setValue={setTitle}
                    className="sm:col-span-2"
                  />

                  <Choice
                    label="Property type"
                    value={type}
                    setValue={setType}
                    options={[
                      "House",
                      "Apartment",
                      "Flat",
                      "Room",
                      "PG",
                    ]}
                  />

                  <Choice
                    label="BHK"
                    value={bhk}
                    setValue={setBhk}
                    options={[
                      "Studio",
                      "1 BHK",
                      "2 BHK",
                      "3 BHK",
                      "4+ BHK",
                    ]}
                  />

                  <Field
                    label="Monthly rent"
                    value={rent}
                    setValue={setRent}
                    type="number"
                  />

                  <Field
                    label="Security deposit"
                    value={deposit}
                    setValue={setDeposit}
                    type="number"
                  />

                </div>

              </FormSection>

              {/* LOCATION */}
              <FormSection title="Location">

                <div className="grid gap-5 sm:grid-cols-3">

                  <Field
                    label="Area"
                    value={area}
                    setValue={setArea}
                  />

                  <Field
                    label="City"
                    value={city}
                    setValue={setCity}
                  />

                  <Field
                    label="State"
                    value={state}
                    setValue={setState}
                  />

                </div>

                <div className="map-grid mt-5 grid h-40 place-items-center rounded-card border bg-map">

                  <div className="text-center">

                    <MapPin className="mx-auto text-primary" />

                    <p className="mt-2 text-sm font-bold">
                      Pin your exact location
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Map picker preview
                    </p>

                  </div>

                </div>

              </FormSection>

              {/* AVAILABILITY */}
              <FormSection title="Availability">

                <div className="grid gap-3 sm:grid-cols-2">

                  <StatusChoice
                    active={
                      status === "vacant"
                    }
                    tone="success"
                    title="VACANT"
                    copy="Available for rent now"
                    onClick={() =>
                      setStatus("vacant")
                    }
                  />

                  <StatusChoice
                    active={
                      status === "full"
                    }
                    tone="danger"
                    title="FULL"
                    copy="Currently occupied"
                    onClick={() =>
                      setStatus("full")
                    }
                  />

                </div>

              </FormSection>

              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={publish}
              >
                Publish Property
              </Button>

            </div>

            {/* LIVE PREVIEW */}
            <aside className="lg:sticky lg:top-24 lg:self-start">

              <p className="mb-3 text-xs font-bold uppercase text-muted-foreground">
                Live preview
              </p>

              <PropertyCard
                property={preview}
              />

            </aside>

          </div>

        </div>
      </section>
    </AppShell>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">

        <h2 className="text-xs font-extrabold uppercase">
          {title}
        </h2>

        <span className="h-px flex-1 bg-border" />

      </div>

      {children}
    </section>
  );
}

function Field({
  label,
  value,
  setValue,
  type = "text",
  className,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>

      <Label>{label}</Label>

      <Input
        className="mt-2 bg-background"
        type={type}
        value={value}
        onChange={(event) =>
          setValue(event.target.value)
        }
      />

    </div>
  );
}

function Choice({
  label,
  value,
  setValue,
  options,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  options: string[];
}) {
  return (
    <div>

      <Label>{label}</Label>

      <Select
        value={value}
        onValueChange={setValue}
      >

        <SelectTrigger className="mt-2 bg-background">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>

          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
            >
              {option}
            </SelectItem>
          ))}

        </SelectContent>

      </Select>

    </div>
  );
}

function StatusChoice({
  active,
  tone,
  title,
  copy,
  onClick,
}: {
  active: boolean;
  tone: "success" | "danger";
  title: string;
  copy: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-card border-2 bg-background p-5 text-left transition-all",
        active
          ? tone === "success"
            ? "border-success shadow-card"
            : "border-danger shadow-card"
          : "border-border"
      )}
    >

      <span
        className={cn(
          "inline-block size-3 rounded-full",
          tone === "success"
            ? "bg-success"
            : "bg-danger"
        )}
      />

      <p className="mt-3 font-extrabold">
        {title}
      </p>

      <p className="mt-1 text-sm text-muted-foreground">
        {copy}
      </p>

    </button>
  );
}