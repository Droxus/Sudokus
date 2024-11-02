import { Cell } from "@/components/Cell";
import { ThemedView } from "@/components/ThemedView";
import * as models from "@/utills/models";
import { FlatList } from "react-native";

export function Section({ flatsection }: any) {
  return (
    <ThemedView
      style={{
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "green",
      }}
    >
      <FlatList
        data={flatsection.cells}
        numColumns={3}
        keyExtractor={(item) =>
          item.row * flatsection.cells.length + item.column
        }
        renderItem={({ item }: any) => <Cell cell={item} />}
      />
    </ThemedView>
  );
}
