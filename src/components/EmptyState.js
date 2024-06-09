import React from "react";
import { StyleSheet, Text } from "react-native";

export default function EmptyState() {
  return <Text style={styles.headerText}>EmptyState</Text>;
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
  },
});
