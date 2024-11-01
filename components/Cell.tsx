import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGridContext } from "@/providers/GridContext";
import { useEffect, useState } from "react";

export function Cell({ cell }: any) {
  return (
    <ThemedText
      style={{
        padding: 20,
        fontSize: 32,
        width: "33.33%",
        textAlign: "center",
        verticalAlign: "middle",
        backgroundColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "red",
      }}
      onPress={(e) => {
        console.log(cell);
      }}
    >
      {cell.value}
    </ThemedText>
  );
}
