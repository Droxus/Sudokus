import { Button } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useGridContext } from "@/providers/GridContext";

export function ControlPanel({}) {
  const { changeActiveCellValue } = useGridContext();
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
              changeActiveCellValue?.(value);
            }}
          />
        ))}
    </ThemedView>
  );
}
