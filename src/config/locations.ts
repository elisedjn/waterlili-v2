export const workshopLocations = ["ericeira", "santa-cruz"] as const;

export type WorkshopLocation = (typeof workshopLocations)[number];

export interface LocationInfo {
  label: string;
  color: "pink" | "yellow" | "green" | "orange" | "blue";
}

// Add a new location here (and in nothing else) to get a new tag on workshop cards.
export const locationInfo: Record<WorkshopLocation, LocationInfo> = {
  ericeira: { label: "Ericeira", color: "blue" },
  "santa-cruz": { label: "Santa Cruz", color: "orange" },
};
