import { Section } from "@/components/Section";
import { ThemedView } from "@/components/ThemedView";
import { useGridContext } from "@/providers/GridContext";
import { Cell } from "@/utills/models";
import { useContext, useEffect } from "react";
import { FlatList } from "react-native";

export function Grid({}) {
  const { cells, sections, flatSections, setCells } = useGridContext();

  return (
    <ThemedView>
      <FlatList
        data={flatSections}
        numColumns={3}
        keyExtractor={(item) => item.index}
        renderItem={({ item }: any) => <Section flatsection={item}></Section>}
      />
    </ThemedView>
  );
}
