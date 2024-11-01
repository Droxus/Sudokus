import { Button } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useGridContext } from "@/providers/GridContext";
import { Cell } from "@/utills/models";

export function ControlPanel({}) {
  const { setCell, activeCell } = useGridContext();
  return (
    <ThemedView
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {new Array(9)
        .fill(null)
        .map((_, index) => index + 1)
        .map((value) => (
          <Button
            key={value}
            title={String(value)}
            onPress={(e) => {
              setCell(new Cell({ ...activeCell, value: value }));
            }}
          />
        ))}
    </ThemedView>
  );
}
