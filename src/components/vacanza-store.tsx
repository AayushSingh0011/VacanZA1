import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  initialProperties,
  type Availability,
  type Property,
} from "@/lib/vacanza-data";

type Store = {
  properties: Property[];
  saved: string[];

  setStatus: (id: string, status: Availability) => void;
  toggleSaved: (id: string) => void;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, patch: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
};

const StoreContext = createContext<Store | null>(null);

const PROPERTIES_KEY = "vacanza_properties";
const SAVED_KEY = "vacanza_saved";

export function VacanzaProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const stored = localStorage.getItem(PROPERTIES_KEY);

      if (stored) {
        return JSON.parse(stored);
      }

      return initialProperties;
    } catch {
      return initialProperties;
    }
  });

  const [saved, setSaved] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_KEY);

      if (stored) {
        return JSON.parse(stored);
      }

      return ["river-view-heights", "steel-city-enclave"];
    } catch {
      return ["river-view-heights", "steel-city-enclave"];
    }
  });

  // Save properties whenever they change
  useEffect(() => {
    localStorage.setItem(
      PROPERTIES_KEY,
      JSON.stringify(properties)
    );
  }, [properties]);

  // Save favourites whenever they change
  useEffect(() => {
    localStorage.setItem(
      SAVED_KEY,
      JSON.stringify(saved)
    );
  }, [saved]);

  const value = useMemo<Store>(
    () => ({
      properties,
      saved,

      setStatus: (id, status) => {
        setProperties((items) =>
          items.map((property) =>
            property.id === id
              ? {
                  ...property,
                  status,
                  stale: false,
                  lastUpdated: "just now",
                }
              : property
          )
        );
      },

      toggleSaved: (id) => {
        setSaved((ids) =>
          ids.includes(id)
            ? ids.filter((item) => item !== id)
            : [...ids, id]
        );
      },

      addProperty: (property) => {
        setProperties((items) => [
          property,
          ...items,
        ]);
      },

      updateProperty: (id, patch) => {
        setProperties((items) =>
          items.map((property) =>
            property.id === id
              ? {
                  ...property,
                  ...patch,
                  lastUpdated: "just now",
                }
              : property
          )
        );
      },

      deleteProperty: (id) => {
        setProperties((items) =>
          items.filter(
            (property) => property.id !== id
          )
        );

        setSaved((ids) =>
          ids.filter((item) => item !== id)
        );
      },
    }),
    [properties, saved]
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useVacanza() {
  const value = useContext(StoreContext);

  if (!value) {
    throw new Error(
      "useVacanza must be used within VacanzaProvider"
    );
  }

  return value;
}