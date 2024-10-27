import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGridContext } from "@/providers/GridContext";
import { useEffect, useState } from "react";

export function Cell({ value: initvalue, column, row }: any) {
  const { changeActiveCellValue, setChangeActiveCellValue } = useGridContext();

  const [value, setValue] = useState(initvalue);

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
        setChangeActiveCellValue(setValue);
      }}
    >
      {value}
    </ThemedText>
  );
}
