import { Cell } from "@/components/Cell";
import { ThemedView } from "@/components/ThemedView";
import * as models from "@/utills/models";

export function Section({ flatsection }: any) {
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
      {flatsection.map((cell: models.Cell, index: number) => (
        <Cell key={index} cell={cell} />
      ))}
    </ThemedView>
  );
}
