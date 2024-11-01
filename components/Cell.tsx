import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGridContext } from "@/providers/GridContext";
import * as models from "@/utills/models";
import { useEffect, useState } from "react";

type Props = {
  cell: models.Cell;
};

export function Cell({ cell }: Props) {
  const { setCell } = useGridContext();
  return (
    <ThemedText
      style={{
        padding: 20,
        fontSize: 32,
        width: "33.33%",
        textAlign: "center",
        verticalAlign: "middle",
        backgroundColor: cell.isActive ? "white" : "black",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "red",
      }}
      onPress={(e) => {
        setCell(new models.Cell({ ...cell, isActive: true }));
        console.log(cell);
      }}
    >
      {cell.value}
    </ThemedText>
  );
}
