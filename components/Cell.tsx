import { styles } from "@/app/(tabs)";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useDimensions } from "@/hooks/useDimensions";
import { useGridContext } from "@/providers/GridContext";
import * as models from "@/utills/models";
import { useEffect, useState } from "react";

type Props = {
  cell: models.Cell;
};

export function Cell({ cell }: Props) {
  const { setCell } = useGridContext();

  const {
    window: { width, height },
  } = useDimensions();
  const minDimension = Math.min(width, height);
  const maxDimension = Math.max(width, height);
  const cellSize = minDimension * 0.08;
  const fontSize = minDimension * (32 / maxDimension);

  return (
    <ThemedText
      style={{
        width: cellSize,
        height: cellSize,
        fontSize: fontSize,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: cell.isActive ? "purple" : "black",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "green",
      }}
      onPress={(e) => {
        setCell(new models.Cell({ ...cell, isActive: !cell.isActive }));
        console.log(cell);
      }}
    >
      {cell.value}
    </ThemedText>
  );
}
