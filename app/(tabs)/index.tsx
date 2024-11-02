import { Image, StyleSheet, Platform, Button, Dimensions } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Cell } from "@/components/Cell";
import { Section } from "@/components/Section";
import { Grid } from "@/components/Grid";
import { GridContext } from "@/providers/GridContext";
import { ControlPanel } from "@/components/ControlPanel";

export default function HomeScreen() {
  return (
    <ThemedView
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        gap: 50,
      }}
    >
      <GridContext>
        <Grid></Grid>
        <ControlPanel></ControlPanel>
      </GridContext>
    </ThemedView>
  );
}

export const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
