import { Section } from "@/components/Section";
import { ThemedView } from "@/components/ThemedView";
import { useGridContext } from "@/providers/GridContext";
import { Cell } from "@/utills/models";
import { useContext, useEffect } from "react";

export function Grid({}) {
  const { cells, sections, flatSections, setCells } = useGridContext();

  return (
    <ThemedView
      style={{
        width: "60%",
        height: "60%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
      }}
    >
      {flatSections.map((flatsection: Cell[], index: number) => (
        <Section key={index} flatsection={flatsection}></Section>
      ))}
    </ThemedView>
  );
}
