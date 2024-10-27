import { Cell } from "@/components/Cell";
import { ThemedView } from "@/components/ThemedView";

export function Section({ column, row }: any) {
  return (
    <ThemedView
      style={{
        width: "33.33%",
        height: "33.33%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        // borderWidth: 2,
        // borderStyle: "solid",
        // borderColor: "green",
      }}
    >
      {new Array(9).fill(9).map((value, index) => (
        <Cell
          key={index}
          value={value}
          row={3 * row + Math.floor(index / 3)}
          column={3 * column + (index % 3)}
        />
      ))}
    </ThemedView>
  );
}
