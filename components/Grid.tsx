import { Section } from "@/components/Section";
import { ThemedView } from "@/components/ThemedView";
import { useGridContext } from "@/providers/GridContext";
import { useEffect } from "react";

export function Grid({}) {
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
      {new Array(9).fill(9).map((value, index) => (
        <Section
          key={index}
          row={Math.floor(index / 3)}
          column={index % 3}
        ></Section>
      ))}
    </ThemedView>
  );
}
